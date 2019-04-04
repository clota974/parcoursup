require = window.nodeRequire;
var fs = require('fs');
var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();
 
// Negative value or undefined will disable logging, levels 0-4 enable it.
GPhoto.setLogLevel(1);
GPhoto.on('log', function (level, domain, message) {
    console.info(domain, message);
  });
 
// List cameras / assign list item to variable to use below options
GPhoto.list(function (list) {

  if (list.length === 0) return;
    camera = list[0];
  console.log('Found', camera.model);
 
  console.log(camera);
  // get configuration tree
  camera.getConfig(function (er, settings) {
    console.log(settings);
  });
 
  // Set configuration values
  camera.setConfigValue('capturetarget', 1, function (er) {
    if(er) console.error(er);
  });
  camera.setConfigValue("output", 2, function(er){
      if(er) console.error(er);
  })
 
  // Take picture with camera object obtained from list()
  /*camera.takePicture({download: true, keep: false}, function (er, data) {
    if(er) console.error(er);
    fs.writeFileSync(__dirname + '/picture.jpg', data);
  });
 /*
  // Take picture and keep image on camera
  camera.takePicture({
    download: true,
    keep: true
  }, function (er, data) {
    fs.writeFileSync(__dirname + '/picture.jpg', data);
  });
 
  // Take picture without downloading immediately
  camera.takePicture({download: false}, function (er, path) {
    console.log(path);
  });
 
  // Take picture and download it to filesystem
  camera.takePicture({
    targetPath: '/tmp/foo.XXXXXX'
  }, function (er, tmpname) {
    fs.renameSync(tmpname, __dirname + '/picture.jpg');
  });
 
  // Download a picture from camera
  camera.downloadPicture({
    cameraPath: '/store_00020001/DCIM/100CANON/IMG_1231.JPG',
    targetPath: '/tmp/foo.XXXXXX'
  }, function (er, tmpname) {
    fs.renameSync(tmpname, __dirname + '/picture.jpg');
  });
 
  // Get preview picture (from AF Sensor, fails silently if unsupported)
  */

  camera.takePicture({
    preview: false,
    targetPath: __dirname+'/foo.jpg'
  }, function (er, tmpname) {
      if(er) console.error(er)
      console.log(tmpname)
    fs.renameSync(tmpname, __dirname + '/pictdure.jpg');
  });

  
});