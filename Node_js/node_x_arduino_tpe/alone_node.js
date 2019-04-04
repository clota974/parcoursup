const SerialPort = require("serialport");
const fs = require("fs");

var port = new SerialPort("/dev/cu.usbmodem1411", {baudRate: 9600}, function(err){
  if (err) {
    return console.log('Error: ', err.message);
  }
});

var x = 0;

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
port.pipe(parser); // pipe the serial stream to the parser

port.on('data', function (data) {
    if(x++>5) return false;

    data = "Data:" + data.toString("ascii");

    console.log(data);
    fs.writeFile('serial_log.txt', data, (err) => {
        if (err) throw err;
      });
});