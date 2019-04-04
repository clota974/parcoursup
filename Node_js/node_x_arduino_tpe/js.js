        var sp = window.nodeRequire('serialport');
var port = null;
var angle = 0;

$(document).ready(function() {
  var portCom = "";

  sp.list(function (err, ports) {
    for (let i = 0; i < ports.length; i++) {
      //console.log(ports[i]);
      if(ports[i].manufacturer==undefined){
        continue;
      }
      if(ports[i].manufacturer.match(/arduino/i)){
        portCom = ports[i].comName;
      }
    }
    go();
  });

  function go(){

    port = new sp(portCom, {
      baudRate: 9600
    });

    port.on("data", function (data) {
      handleData(data);
    })
    //console.log(port)
  }
  //navigator.requestMIDIAccess().then(onMIDIInit, console.log);

  svg = Snap("svg");
  x = 0;
  h = 1000;
  calibrating = false;
  calibrated = false;

  $("#calibrate").click(function () { 
    calibrating = true;
    $("div.cover").removeClass("hide");
  
    var remain = 9;
    var interval = setInterval(function () { 
      $("#remain").text(remain--);
      if(remain == 0){
        calibrate();
        $("div.cover").addClass("hide");    
        clearInterval(interval);
      }
     }, 1000);
  
  });
});

var dataBuff = "";
var handleData = function(data){
  dataBuff += data;

  var regex = dataBuff.match(/(.+);(.*)/);
  if(regex!=null){
    treatData(regex[1]);
    dataBuff = regex[2] || "";
  }
}

var treatData = function (data) { 
  //console.log(data);
  var filter = data.match(/A(\d+)B(\d+)C(\d+)D(\d+)?/);
  if(filter==null) return false;

  var a = +filter[1]; generatePath("a", a);
  var b = +filter[2]; generatePath("b", b);
  var c = +filter[3]; generatePath("c", c);
  var d = +filter[4]; generatePath("d", d);

  if(!calibrated) return false;

  var ae = a - calibratedAverage.a + calibratedAverage.sum; generatePath("ae", ae);
  var be = b - calibratedAverage.b + calibratedAverage.sum; generatePath("be", be);
  var ce = c - calibratedAverage.c + calibratedAverage.sum; generatePath("ce", ce);
  var de = d - calibratedAverage.d + calibratedAverage.sum; generatePath("de", de);
  
}

var generatePath = function(pin, value){
  if(calibrating){
    x = 0;
    if(pin.length == 2) return false;
    
    calibrateData[pin].push(value);
    return false;
  }

  path = svg.select("path."+pin);  
  $("."+pin).text(value);

  var zoom = 1/30;
  var SVGPoint = Math.round((1000/zoom-value)*zoom); //SVG point

  var attr = path.attr("d");

  attr += `h1 V${SVGPoint} `;

  if(x++>8000){
    attr = attr.replace(/h1 V(\d+)/, "");
  }
  path.attr({d: attr});

}

var calibrateData = {
  a: [],
  b: [],
  c: [],
  d: []
}
var calibratedAverage = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  sum: 0
}
var calibrate = function(pin, data){
  console.log(calibrateData);
  
  for (let pin in calibrateData) {
    const array = calibrateData[pin];
    var avg = 0;
    var sum = 0;

    $(array).each(function (ix) {           
        sum += array[ix];
     })

    avg = sum/array.length;

    calibratedAverage[pin] = Math.round(avg);
    
  }

  calibratedAverage.sum = Math.round((calibratedAverage.a + calibratedAverage.b + calibratedAverage.c + calibratedAverage.d)/4);

  var paths = svg.selectAll("path");

  for (let i = 0; i < 4; i++) {
    const element = paths[i];
    
    element.attr("d", "M0 1000")
  }

  calibrating = false;  
  calibrated = true;  
}

/*

function onMIDIInit( midi ) {
  for (var _input of midi.inputs.values()){
    input = _input;
    input.onmidimessage = midiMessageReceived;
  }

  for (var _output of midi.outputs.values()){
    output = _output;
    allOff();
  }
}
function midiMessageReceived( ev ) {
    console.log(ev);
    var {data} = ev;

    $("#r").text(data[0]);
    $("#g").text(data[1]);
    $("#b").text(data[2]);

    output.send([0x90, data[1], 127]);
}

function allOff(){
  for (var i = 0; i < 127; i++) {
    output.send([144, i, 00]);
  }
}

function play(){
  for (let i = 0; i < 127; i++) {
    setTimeout(function () {
      output.send([144, i, 127]);
    }, i*100);
  }
}
*/