const ds = require("dualshock");
const crc = require("buffer-crc32");

var list = ds.getDevices();
 dev = ds.open(list[0]);
 
//dev.mode = "bluetooth";
dev.ondigital = function () { 
    console.log('hi');
 }

setTimeout(() => {
        dev.vol = [0,0,0,0,0]
        dev.ledState = [0,255,255,255,255]
        msg = [
            0xa2, 0x11, 0xc0, 0xa0, 0xf3, 0x04, 0x00,//0x80, 0x00, 0x0f, 0x00, 0x00,
            dev.rPowR, //Rumble Power Right
            dev.rPowL, //Rumble Power Left
            dev.ledState[0], //LED Red
            dev.ledState[1], //LED Green
            dev.ledState[2], //LED Blue
            dev.ledState[3], //LED Flash On
            dev.ledState[4], //LED Flash Off
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            dev.vol[0], dev.vol[1], dev.vol[2], dev.vol[3], 0x85, //Volumes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]
    const buff = Buffer.from(msg);
    const crc32 = crc(buff);
    msg[75] = crc32[0]; msg[76] = crc32[1];
    msg[77] = crc32[2]; msg[78] = crc32[3];
    
    //msg.shift();
    console.log(msg);
    
    dev.getFeatureReport(0xa3, 66)
}, 1000);