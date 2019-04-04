const HID = require("node-hid");
const robotjs = require("robotjs");

console.log(HID.devices());

String.prototype.pad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

function touchpadCalculate(args) {
    args = args.join(""); // [12, ab, 34]  ==>> '12ab34'
    var goToTheBeginning = args[3]; // ==> b
    var goToTheEnd = args[2]; // ==> a
    args = args.split(""); // ==> [1,2,a,b,3,4]
    args.splice(2, 2); // ==> [1,2,3,4]
    args.unshift(goToTheBeginning); // ==> [b,1,2,3,4]
    args.push(goToTheEnd); // [b,1,2,3,4,a]
    var xHex = args.slice(0, 3).join(""); // ==> b12
    var yHex = args.slice(3, 6).join(""); // 34a
    var x = parseInt(xHex, 16);
    var y = parseInt(yHex, 16);
    return { __return: (`x = ${x} ; y = ${y}`), args };
}

class Controller {
    constructor() {
        var thi$ = this;

        this.device = new HID.HID(1356,1476);
        this.lastSettings = {}

        this.device.on("data", function (data) {
            thi$.data = data;
            thi$.analyze(data);
        });
        this.device.on("error", function (err) {
            thi$.onError(err);
        })

        this.values = {};
    }

    write(args){
        this.device.write(args);
    }

    send(args) {
        var data = {
            rumbleLeft: args.rumbleLeft || 0,
            rumbleRight: args.rumbleRight || 0,
            red: args.red || 0,
            green: args.green || 0,
            blue: args.blue || 0,
            flashOn: args.flashOn || 0,
            flashOff: args.flashOff || 0
        }

        var array = [5, 255, 4, 0, data.rumbleRight, data.rumbleLeft, data.red, data.green, data.blue, data.flashOn, data.flashOff]
        
        this.device.write(array);
        this.lastSettings = data;
    }

    onError(err){
        console.warn(err);
    }

    analyze(buffer) {
        this.buffer = buffer;

        var hexBuff = buffer.hexSlice();

        var hexBoard = hexBuff.replace(/((.){2})/g, function (key) {
            var deciNbr = parseInt(key, 16).toString();
            deciNbr = deciNbr.pad("0", 3); // Transform 1 to 001

            return key + " "; // Eventually change key to deciNbr
        })

        this.hexArray = hexBoard.split(" ");

        this.showHexArray();
        this.showTable();
        this.showDigitalTable();
    }

    showHexArray() {
        var thi$ = this;

        $("p").text("");

        for (let i = 0; i < thi$.hexArray.length; i++) {

            $("p").append(thi$.hexArray[i] + " ");

            if ((i + 1) % 16 == 0) {
                $("p").append("<br/>")
            }
        }
    }

    showTable() {
        var thi$ = this;

        var table = $("table.analog");
        $(table).html("<tr><th>Name</th><th>Value</th></tr>")

        for (let i = 0; i < mapping.length; i++) {
            var el = mapping[i];
            var value = undefined;

            if (el.type == "int") {
                var hexValue = thi$.hexArray[el.index];
                value = parseInt(hexValue, 16);
            }

            if (el.type == "signed") {
                var hexValue1 = thi$.hexArray[el.index];
                var hexValue2 = thi$.hexArray[el.index+1];
                var value1 = parseInt(hexValue1, 16);
                var value2 = parseInt(hexValue2, 16);

                var b = new Buffer([value1, value2])
                value = b.readInt8();

                value = value == -1 ? 0 : value;
            }

            if(el.type == "function"){
                var finalArgs = [];

                for (let j = 0; j < el.args.length; j++) {
                    var pinNumber = el.args[j];
                    var pinValue = thi$.hexArray[pinNumber];

                    finalArgs.push(pinValue);
                }



                value = el.exec(finalArgs);
            }

            var row = $(`
                <tr>
                    <td>${el.name}</td>
                    <td>${value}</td>
                </tr>
            `);

            $(table).append(row);

            thi$.values[el.name] = value;
        }
    }

    showDigitalTable(){
        var thi$ = this;
        
        var table = $("table.digital");
        $(table).html("<tr><th>Name</th><th>Value</th></tr>")

        for (let i = 0; i < digitalMap.length; i++) {
            var el = digitalMap[i];
            var value = undefined;

            if(el.type == "bool"){
                var byte = thi$.hexArray[el.byte]; 
                byte = parseInt(byte, 16);
                

                var binary = byte.toString(2);
                binary = binary.pad("0", 8);

                var bit = binary[el.bit];
            
                value = bit==1 ? "1":"0";              
            }

            if(el.type=="d-pad"){
                var byte = thi$.hexArray[el.byte]; 
                byte = parseInt(byte, 16);
                

                var binary = byte.toString(2);
                binary = binary.pad("0", 8);

                var binary_array = binary.split("");
                
                var dPadBytes = +(binary_array.splice(4,4)).join("");

                var integer = parseInt(dPadBytes, 2);

                var cases = ["N","NE","E","SE","S","SW","W","NW","False"];
                value = cases[integer];
            }
            

            var row = $(`
            <tr>
                <td>${el.name}</td>
                <td>${value}</td>
            </tr>
            `);

            $(table).append(row);
            thi$.values[el.name] = value;
        }
    }
}


var mapping = [
    {
        name: "L Joystick X",
        type: "int",
        index: 1
    },
    {
        name: "L Joystick Y",
        type: "int",
        index: 2
    },
    {
        name: "R Joystick X",
        type: "int",
        index: 3
    },
    {
        name: "R Joystick Y",
        type: "int",
        index: 4
    },
    {
        name: "L2",
        type: "int",
        index: 8
    },
    {
        name: "R2",
        type: "int",
        index: 9
    },
    {
        name: "Battery level",
        type: "int",
        index: 12
    },
    {
        name: "Touchpad F1",
        type: "function",
        args: [36,37,38],
        exec: function(args){
            // The value 12,ab,34 must transform to b12, 23a. Then we have x = b12 ; y = 34a
            
            let __return;
            ({ __return, args } = touchpadCalculate(args));
            return __return;
        }
    },
    {
        name: "Touchpad F2",
        type: "function",
        args: [40,41,42],
        exec: function(args){
            // The value 12,ab,34 must transform to b12, 23a. Then we have x = b12 ; y = 34a
            
            let __return;
            ({ __return, args } = touchpadCalculate(args));
            return __return;
        }
    }, 
    {
        name: "Accel Z",
        type: "signed",
        index: 14
    },
    {
        name: "Accel X",
        type: "signed",
        index: 16
    },
    {
        name: "Accel Y",
        type: "signed",
        index: 18
    },
    {
        name: "Gyro X",
        type: "signed",
        index: 20
    },
    {
        name: "Gyro Y",
        type: "signed",
        index: 22
    },
    {
        name: "Gyro Z",
        type: "signed",
        index: 24
    },
]

var digitalMap = [
    {
        name: "Cross", byte: 5, bit: 2, type: "bool"
    }, 
    {
        name: "Circle", byte: 5, bit: 1, type: "bool"
    }, 
    {
        name: "Triangle", byte: 5, bit: 0, type: "bool"
    }, 
    {
        name: "Square", byte: 5, bit: 3, type: "bool"
    }, 
    {
        name: "L3", byte: 6, bit: 1, type: "bool"
    }, 
    {
        name: "R3", byte: 6, bit: 0, type: "bool"
    }, 
    {
        name: "L1", byte: 6, bit: 7, type: "bool"
    }, 
    {
        name: "R1", byte: 6, bit: 6, type: "bool"
    }, 
    {
        name: "Options", byte: 6, bit: 2, type: "bool"
    }, 
    {
        name: "Share", byte: 6, bit: 3, type: "bool"
    }, 
    {
        name: "Touchpad", byte: 7, bit: 6, type: "bool"
    },
    {
        name: "PS", byte: 7, bit: 7, type: "bool"
    },
    {
        name: "D-PAD", byte: 5, bit: 4, type: "d-pad"
    },
]



controller = new Controller()

setInterval(function () {
    return false;
    var coord = controller.values["Touchpad F1"];
    var regexp = coord.match(/(\d)+/g);

    var left = + regexp[0]/3;
    var top = + regexp[1]/3;

    $("#circleQ").css({top, left});

    var red = controller.values["L Joystick X"];
    var green = controller.values["L Joystick Y"];
    var blue = controller.values["L2"];

    var rumbleRight = controller.values["Cross"]==1?0:0;
    var rumbleLeft = controller.values["Square"]==1?255:0;

    controller.send({red, green, blue, rumbleRight, rumbleLeft});

    var __X = controller.values["L Joystick X"];
    var __Y = controller.values["L Joystick Y"];

    var xPad = 0;
    var yPad = 0;

    const MIN = 120;
    const MAX = 140;
    const SENSIVITY = 0.15;

    if(__X < MAX && __X > MIN){
        xPad = 0
    }else{
        xPad = (__X - 130) * SENSIVITY;
    }
   
    if(__Y < MAX && __Y > MIN){
        yPad = 0
    }else{
        yPad = (__Y - 130) * SENSIVITY;
    }

    xPad += robotjs.getMousePos().x;
    yPad += robotjs.getMousePos().y;

    robotjs.moveMouse(xPad, yPad);

    if(controller.values["Cross"]==1){
        robotjs.mouseClick("left");
    }
    
},1);


/*
HID.devices();

var device = new HID.HID(1356,1476);


var w = true;
var buff = null;

fooBuff = [5,255,4,0,0,0,0,0,0,0,0,0,0,0,0]
device.write(fooBuff)

device.on("data", function(data){
    buff = data;

    if(w){

        console.log(data)

        w = false
    }
})

setInterval(function(){
    show();
    $("p").text("");

    var txt = buff.hexSlice();
    var res = txt.replace(/((.){2})/g, function(key){
        var intNbr = parseInt(key,16).toString();

        intNbr = intNbr.pad("0",3);

        return key +" ";
    })

    ar = res.split(" ");

    for (let i = 0; i < ar.length; i++) {
        $("p").append(ar[i]+" ");
        if((i+1)%16 == 0) $("p").append("<br/>")
    }


},1)

function show(){

} */