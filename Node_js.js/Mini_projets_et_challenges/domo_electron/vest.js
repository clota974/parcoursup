const fs = require('fs');
var lame = require('lame');
var sound = require('naudiodon');
var audio = require('osx-audio');


var Webcast = function(options) {
    
    // create the Encoder instance
    var encoder = new lame.Encoder({
        // input
        channels: 2,        // 2 channels (left and right)
        bitDepth: 16,       // 16-bit samples
        sampleRate: 44100,  // 44,100 Hz sample rate
        
        // output
        bitRate: options.bitrate,
        outSampleRate: options.samplerate,
        mode: (options.mono ? lame.MONO : lame.STEREO) // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
    });
 
    var input = new audio.Input();
    input.pipe(encoder);

    var ao = new sound.AudioIO({
        outOptions: {
            channelCount: 2,
            sampleFormat: sound.SampleFormat16Bit,
            sampleRate: 44100,
            deviceId : 1 // Use -1 or omit the deviceId to select the default device
        }
    });
    
    encoder.pipe(ao);
    ao.start();

}

w = Webcast({bitrate: 128000, samplerate: 44100, port: 3000, mono: true})