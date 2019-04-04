var portAudio = require('naudiodon');

var d = portAudio.getDevices();

var o = d[2];

var aout = new portAudio.AudioIO({
  outOptions: {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId: 1 // Use -1 or omit the deviceId to select the default device
  }
});

var ain = new portAudio.AudioIO({
  inOptions: {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId: 4 // Use -1 or omit the deviceId to select the default device
  }
});
 
ain.pipe(aout);

ain.start();
aout.start();
