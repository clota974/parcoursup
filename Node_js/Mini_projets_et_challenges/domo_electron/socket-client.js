var Webcast = function(options) {
    
    var lame = require('lame');
    var audio = require('osx-audio');
    var fs = require('fs');
    
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

    var io = require('socket.io-client');
    var ss = require('socket.io-stream');
    
    var socket = io.connect('http://192.168.0.111:3000/user');
    var stream = ss.createStream();
    
    ss(socket).emit('play', stream, {name: "test.mp3"});
    encoder.pipe(stream)

    console.log("Running")
}

w = Webcast({bitrate: 128000, samplerate: 44100, port: 3000, mono: true})