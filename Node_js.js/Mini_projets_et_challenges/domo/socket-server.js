var io = require('socket.io').listen(3000);
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');
var sound = require("naudiodon");

var ao = new sound.AudioOutput({
    channelCount: 2,
    sampleFormat: sound.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId : -1 // Use -1 or omit the deviceId to select the default device
  });
 
io.of('/user').on('connection', function(socket) {
  ss(socket).on('play', function(stream, data) {
    stream.pipe(ao);
    
    go();
  });
});

function go(){
    try{
        console.log("here we go")
        ao.start();
    }catch{
        ao.end();
        go();
    }
}