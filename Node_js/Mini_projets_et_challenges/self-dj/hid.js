String.prototype.pad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}


var HID = require("node-hid");

HID.devices();

var device = new HID.HID(1356,1476);


var w = true;
var buff = null;
var needReport = false;

fooBuff = [5,255,4,0,0,100,0,0,0,0,0,0,0,0,0]
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

    if(needReport){
        sendFR();
    }

    try{
        var txt = buff.hexSlice();
        handleTxt(txt)
    }catch(e){
        //console.log(buff);
        needReport = true;
        return false;
    }
    


},1)

function show(){

}

function sendFR(){
    var local_buff = device.sendFeatureReport([0x02, 78]);
    local_buff = Buffer.from(local_buff).hexSlice();;
    //console.log(local_buff.hexSlice());
    handleTxt(local_buff);
}

function handleTxt(txt){
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
}