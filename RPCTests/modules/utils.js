const fs = require('fs');
var debug = true;

module.exports = {

 sleep: function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 },

 setDebug: function setDebug(value) { debug = value; },

 getDebug: function getDebug() { return debug; },

 cLog: function cLog(value) { if (debug) console.log(value); },

 testLog: function testLog(value) { console.log(value); },

 mkdir: function mkdir(path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
 },

 rmdir: function rmdir(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        rmdir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
 },

 readFile: function readFile(path, callback, cb) {
    fs.readFile(path, 'utf8',  (err, data) => { callback (err, data, cb) });
 },

 writeFile: function writeFile(path, data) {
   fs.writeFile(path, data, (err) => { if (err) throw err;});
 },

 listFiles: function listFiles(dir) {

    var results = [];
    fs.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(listFiles(file))
        } else results.push(file);
    });

    return results;
 }

} //exports
