const bluetooth = require('node-bluetooth');
const addr = "1c-66-6d-64-96-6c"; 

// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

device.listPairedDevices(console.log);

device.findSerialPortChannel(addr, function(channel){
    console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

    // make bluetooth connect to remote device
    bluetooth.connect(addr, channel, function(err, connection){
      if(err) return console.error(err);

      connection.delimiter = Buffer.from('\n', 'utf8');
      connection.on('data', (buffer) => {
        console.log('received message:', buffer.toString());
      });

      connection.write(new Buffer('Hello!', 'utf-8'), () => {
        console.log('wrote');
      });
    });

  });
