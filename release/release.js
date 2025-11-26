const ossconfig = require('./config.js')
const fs = require('fs');
const path = require('path');
const config = {
  sourceRoot : path.join(__dirname,'../src/'),
  destRoot: 'allxcx/credit',
}
const OSS = require('ali-oss');
const client = new OSS(ossconfig);



let sourceRoot = config.sourceRoot;
let dir = 'images/';
const readDir = (dir) => {
  let filepath = path.join(sourceRoot,dir);
  fs.readdir(filepath,function(res,files) {
    files.forEach(res => {
      let filepath = path.join(sourceRoot,dir,res);
      let stat = fs.lstatSync(filepath);
      let isFile = stat.isFile();
      if(isFile){
        uploadFile(dir,res,filepath);
      }else{
        let isDir = stat.isDirectory();
        if(isDir){
          let nextDir = dir + res + '/'
          readDir(nextDir);
        }
      }
    })
  })
}
readDir(dir);

const uploadFile = (dir,key,filepath) => {
  let allkey = path.join(config.destRoot,dir,key);
  allkey = allkey.replace(/\\/g,'/');
  console.log(allkey);
  client.put(allkey,filepath).then(res => {
    console.log(filepath);
  })
}
//const filepath = './1.jpg';
//client.put('testmyoss.jpg',filepath).then(res => {
  //console.log(res);
//})

