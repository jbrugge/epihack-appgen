// Testing the generation code before we have the full server and calls set up
var fs = require('fs');
var generator = require('./generate_apk.js');

var appConfigFile = process.argv[2];
var appInfo = JSON.parse(fs.readFileSync(appConfigFile, 'utf8'));

var apkFile = generator.packageAndroidApp(appInfo);

console.log("APK file: " + apkFile);
