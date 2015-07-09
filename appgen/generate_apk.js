var fs = require('fs');

var appConfigFile = process.argv[2];
var appInfo = JSON.parse(fs.readFileSync(appConfigFile, 'utf8'));

function run_cmd(cmd, args, options, callback) {
  var spawn = require('child_process').spawnSync,
    child = spawn(cmd, args, options),
    resp = child.stdout.toString();
	callback(resp);
}

cwd = "";
run_cmd('pwd', [], {}, function(resp) { cwd = resp.toString() });

var targetDir = cwd + "/target",
	apkDir = targetDir + "/platforms/android/build/outputs/apk/",
	keyStore = cwd + "/epihack-app-keys.keystore",
	keyPass = "epihack",
	keyDname = "CN=" + appInfo.organizerName + ", OU=Unknown, O=" + appInfo.organization + ", L=" + appInfo.appCity + ", S=" + appInfo.appState + ", C=" + appInfo.appCountry,
	unsignedApk = "android-release-unsigned.apk",
	signedApk = appInfo.appName + ".apk";
// TODO: why isn't environment variable coming through?
//ANDROID_BUILD_TOOLS_DIR = process.env.ANDROID_HOME + "/build_tools/22.0.1/"
ANDROID_BUILD_TOOLS_DIR = "/home/vagrant/android-sdk-linux/build-tools/22.0.1/"

run_cmd('cordova', ['build', '--release', 'android'], 
	{cwd: targetDir}, function(resp) { console.log(resp) });
run_cmd('keytool', ['-genkey', '-noprompt', '-keystore', keyStore, '-keypass', keyPass, '-storepass', keyPass, '-alias', appInfo.appName, '-dname', keyDname, '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000'], 
	{cwd: targetDir}, function(resp) { console.log(resp) });
run_cmd('jarsigner', ['-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1', '-keystore', keyStore, '-keypass', keyPass, '-storepass', keyPass, unsignedApk, appInfo.appName], 
	{cwd: apkDir}, function(resp) { console.log(resp) });
run_cmd(ANDROID_BUILD_TOOLS_DIR + 'zipalign', ['-v', '4', unsignedApk, signedApk], 
	{cwd: apkDir}, function(resp) { console.log(resp) });
