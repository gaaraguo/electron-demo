const { app, ipcMain } = require('electron');
const remote = require('electron').remote;
const fs = require("fs");
const usbDetect = require('usb-detection');
const { spawn } = require('child_process');
const root_path = process.argv[2];
const path = require("path"); 
const { dir } = require('console');
const si = require('systeminformation');
const {WindowManager} = require("./WindowManager.js");
let win;


function mkdirs(dirname, callback){
  
  fs.stat(dirname, function(exists){
    console.log(dirname);
    
      
        fs.mkdirSync('/Users/gaara/cccc/123',0777);
        console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录');
    
  })
}

function createWindow() {

  new WindowManager().createWindow('#/');

  

  // mkdirs("bbb",function(err){
  //   console.log(err);
  // })

  // fs.writeFile('./1.txt', '好迪真好，大家好才是真的好', err => {
  //   if(err) return console.log(err);
  //   console.log('写入成功')
// })
  usbListener();

  // si.blockDevices()
  // .then(data => console.log(data))
  // .catch(error => console.error(error));

  

}

var isUnixHiddenPath = function (path) {
  return (/(^|\/)\.[^\/\.]/g).test(path);
};

function getAllFiles(root) {
  var res = [];
  var files = fs.readdirSync(root);
  files.forEach(function (file) {
    var isHide = false;


    var pathname = root + '/' + file
      , stat = fs.lstatSync(pathname);
    if (isUnixHiddenPath(pathname)) {
      isHide = true;
    }

    if (!stat.isDirectory()) {
      res.push(pathname.replace(root_path, '.'));
    } else if (!isHide) {
      res = res.concat(getAllFiles(pathname));
    }
  });

  return res;
}


function usbListener() {

 

  var os = require('os')
  var userInfo = os.userInfo()
  



  if (os.type() == 'Windows_NT') {
    //windows
    console.log('这是Windows系统');
  } else if (os.type() == 'Darwin') {
    //mac
    console.log('这是Mac系统');
  } else if (os.type() == 'Linux') {
    //Linux
    console.log('这是Linux系统');
  } else {
    //不支持提示
  }

  // fs.readdir("/Volumes/YYH 970EP2T/RED VS LF/preview",function(err, files){
  //   if (err) {
  //       return console.error(err);
  //   }
  //   files.forEach( function (file){
  //       console.log( file );
  //   });
  // });

  // var rrr = getAllFiles('/Volumes/');
  
 


  // fs.readdir("/Volumes/",function (err,files) {
  //    console.log(files);
  // });

  // fs.watch('/Volumes/', function (event, filename) {

  //   if (filename) {
  //     console.log('filename provided: ' + filename);
  //     console.log(event);
  //     // const ls = spawn('ls', ['-l',  '/Volumes/'+  filename + '/RED VS LF']); //执行命令 ls -l -h filename
  //     // ls.stdout.on('data', (data) => {

  //     //   console.log(`stdout: ${data}`);

  //     // });



  //   } else {
  //     console.log('filename not provided');
  //   }
  // });

  // usbDetect.startMonitoring();
  // usbDetect.on('add', function (device) { console.log(device); });
  // usbDetect.on('add:vid', function(device) { console.log('add', device); });
  // usbDetect.on('add:vid:pid', function(device) { console.log('add', device); });

  // Detect remove
  // usbDetect.on('remove', function (device) { console.log(device); });
  // usbDetect.on('remove:vid', function(device) { console.log('remove', device); });
  // usbDetect.on('remove:vid:pid', function(device) { console.log('remove', device); });

  // // Detect add or remove (change)
  // usbDetect.on('change', function(device) { console.log('change', device); });
  // usbDetect.on('change:vid', function(device) { console.log('change', device); });
  // usbDetect.on('change:vid:pid', function(device) { console.log('change', device); });

  // Get a list of USB devices on your system, optionally filtered by `vid` or `pid`
  // usbDetect.find(function(err, devices) { console.log(devices); });
  // usbDetect.find(vid, function(err, devices) { console.log('find', devices, err); });
  // usbDetect.find(vid, pid, function(err, devices) { console.log('find', devices, err); });
  // // Promise version of `find`:
  // usbDetect.find().then(function(devices) { console.log(devices); }).catch(function(err) { console.log(err); });
}

ipcMain.on("closeWindow", (event, args) => {

  console.log(args);
  new WindowManager().closeWindow(args);

});

ipcMain.on("createWindow", (event, args) => {

  console.log(args);
  new WindowManager().createWindow(args);

});

ipcMain.on("toMain", (event, args) => {
  console.log(args);
  fs.readdir('.', function (err, files) {
    console.log(files);
    event.reply("fromMain", files);
  });

});

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
});
app.on('activate', () => {
  if (win == null) {
    createWindow();
  }
});