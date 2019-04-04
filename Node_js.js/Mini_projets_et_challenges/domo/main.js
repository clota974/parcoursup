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
    
    // set up an express app
    var express = require('express')
    var app = express()

    var input = new audio.Input();
    input.pipe(encoder);


    setInterval(function(){

        console.log("\nEncoder:")
        console.log(encoder._readableState.buffer.length);
    },1000);
    
    app.get('/stream.mp3', function (req, res) {
        res.set({
            'Content-Type': 'audio/mpeg3',
            'Transfer-Encoding': 'chunked'
        });        
        encoder.pipe(res);
    });
    app.get('/page.html', function (req, res) {
        data = fs.readFileSync("page.html").toString();

        res.end(data)
    });
    
    var server = app.listen(options.port);
}

w = Webcast({bitrate: 128000, samplerate: 40, port: 3000, mono: true})