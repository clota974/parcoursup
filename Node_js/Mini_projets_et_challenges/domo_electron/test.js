const fs = require('fs');
var lame = require('lame');
const portAudio = require('naudiodon');

var aio = new portAudio.AudioIO({
  inOptions: {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId: 0 // Use -1 or omit the deviceId to select the default device
  },
  outOptions: {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId: 1 // Use -1 or omit the deviceId to select the default device
  }
});
 
aio.start();

//ai.on("error", stop)
// ao.on("error", stop)

process.on('SIGINT', stop);

  function stop(){
    console.log("stop");
    // ai.quit();
    // ao.quit();
    process.exit(1)
  }