var path = require('path')

// Run throught the steps of packaging as an APK using the
// Cordova and Android SDK command line tools
exports.packageAndroidApp = function(appInfo) {
	var cwd = path.resolve(process.cwd()),
		targetDir = cwd + "/target",
		apkDir = targetDir + "/platforms/android/build/outputs/apk/",
		keyStore = cwd + "/epihack-app-keys.keystore",
		keyPass = "epihack",
		keyDname = "CN=" + appInfo.organizerName + ", OU=Unknown, O=" + appInfo.organization + ", L=" + appInfo.appCity + ", S=" + appInfo.appState + ", C=" + appInfo.appCountry,
		unsignedApk = "android-release-unsigned.apk",
		signedApk = appInfo.appName + ".apk";
	// TODO: why isn't environment variable coming through?
	//ANDROID_BUILD_TOOLS_DIR = process.env.ANDROID_HOME + "/build_tools/22.0.1/"
	ANDROID_BUILD_TOOLS_DIR = "/home/vagrant/android-sdk-linux/build-tools/22.0.1/"

	// TODO: JS file needs to stay executable, but is losing it during copy
	run_cmd_sync("chmod", ["+x", "hooks/after_prepare/010_add_platform_class.js"],
		{cwd: targetDir}, function(resp) { console.log(resp) });

	run_cmd_sync('cordova', ['build', '--release', 'android'], 
		{cwd: targetDir}, function(resp) { console.log(resp) });
	run_cmd_sync('keytool', ['-genkey', '-noprompt', '-keystore', keyStore, '-keypass', keyPass, '-storepass', keyPass, '-alias', appInfo.appName, '-dname', keyDname, '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000'], 
		{cwd: targetDir}, function(resp) { console.log(resp) });
	run_cmd_sync('jarsigner', ['-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1', '-keystore', keyStore, '-keypass', keyPass, '-storepass', keyPass, unsignedApk, appInfo.appName], 
		{cwd: apkDir}, function(resp) { console.log(resp) });
	run_cmd_sync(ANDROID_BUILD_TOOLS_DIR + 'zipalign', ['-v', '4', unsignedApk, signedApk], 
		{cwd: apkDir}, function(resp) { console.log(resp) });

	return apkDir + signedApk;
};

function run_cmd_sync(cmd, args, options, callback) {
	console.log("Starting command " + cmd);
  var spawn = require('child_process').spawnSync,
    child = spawn(cmd, args, options),
    resp = (child.stdout == null ? "" : child.stdout.toString());
	resp += (child.stderr == null ? "" : child.stderr.toString());
	callback(resp);
};	
