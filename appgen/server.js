var fs = require('fs')
    , path = require('path')
    , _ = require('underscore')
    , fse = require('fs.extra')
    , http = require('http')
    , futil = require('./fileUtil.js')
    , url = require('url')
    , express = require('express');


var app = express();
var targetPath = "./target/";
var srcPath = "./template/";
var jsonFile = "./site1.json";


// Creating a Ionic app from github template
// run_cmd("", ["-rf", targetPath], function() {});
//
// run_cmd("", ["-rf", targetPath], function() {});
// run_cmd("mkdir", [targetPath], function() {});
// var siteData = createSiteData(jsonFile);
// console.log("Copying files...");
// fse.copyRecursive(srcPath, targetPath, function(err) {
//   if (! err) {
//     futil.transform(siteData, srcPath, targetPath);
//     futil.createStaticFiles(siteData, targetPath + "www/contents/templates/", "./contentTemplate/");
//   }
// });
//
//
// function createSiteData(jsonFile) {
//   var siteData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
//   var pageMap = {}
//   _.each(siteData.pages, function(page) {
//     pageMap[page.id] = page;
//   })
//   siteData.pageMap = pageMap;
//
//   menuPages = [];
//   _.each(siteData.menus, function(pageId) {
//     menuPages.push(pageMap[pageId]);
//   });
//
//   siteData['menuPages'] = menuPages;
//
//   return siteData;
// }
//
// function run_cmd(cmd, args, callBack ) {
//   var spawn = require('child_process').spawn;
//   var child = spawn(cmd, args);
//   var resp = "";
//
//   child.stdout.on('data', function (buffer) { resp += buffer.toString() });
//   child.stdout.on('end', function() { callBack (resp) });
// }
//
//
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  res.send('POST! Build the app');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
