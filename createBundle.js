var fs = require('fs');
var path = require('path');
var dir = '~dist';
var webackOutput = './bin';
var static = 'static';
var m2u = 'm2u';
var mocks = "mocks"
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
process.env.NODE_ENV = 'production';
if (fs.existsSync(path.resolve(webackOutput))) {
   execSync(`rm -rf ${webackOutput}`);
}
execSync('webpack');
if (!fs.existsSync( path.resolve(dir) )){
    exec(`mkdir ${dir}`, function (err, stdout, stderr) {
         if(err) {
            console.log(err);
            return ;
         }
    });
    realProcess();
}
else if (fs.existsSync( path.resolve(dir, m2u))) {
    exec(`rm -rf "${path.resolve(dir, m2u)}"`, function (err, stdout, stderr) {
         if(err) {
            console.log(err);
            return;
         }
         realProcess();
    });
} else {
  realProcess()
}
function realProcess(){
    fs.mkdirSync( path.resolve(dir, m2u) );
    fs.mkdirSync( path.resolve(dir, m2u, static) );
    fs.mkdirSync( path.resolve(dir, m2u, mocks) );
    exec(`cp index.html "${path.resolve(dir, m2u)}"` , function (err, stdout, stderr) {
           if(err) {
                   console.log(err);
           }
    });
    exec(`cp app.html "${path.resolve(dir, m2u)}"` , function (err, stdout, stderr) {
           if(err) {
                   console.log(err);
           }
    });
    exec(`cp .htaccess "${path.resolve(dir, m2u)}"` , function (err, stdout, stderr) {
           if(err) {
                   console.log(err);
           }
    });
    exec(`cp bin/* "${path.resolve(dir, m2u, static)}"` , function (err, stdout, stderr) {
           if(err) {
                   console.log(err);
           }
    });
    exec(`cp -a src/assets/* "${path.resolve(dir, m2u, static)}"` , function (err, stdout, stderr) {
           if(err) {
                   console.log(err);
           }
    });
    exec(`cp -a mocks/* "${path.resolve(dir, m2u, mocks)}"` , function (err, stdout, stderr) {
           if(err) {
                   console.log(err);
           }
    });
}
