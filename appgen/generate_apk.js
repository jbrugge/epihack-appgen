var fs = require('fs');

var appConfigFile = process.argv[2];
var appInfo = JSON.parse(fs.readFileSync(appConfigFile, 'utf8'));

function run_cmd(cmd, args, options, callback) {
  var spawn = require('child_process').spawnSync,
    child = spawn(cmd, args, options),
    resp = child.stdout.toString();
	callback(resp);
}

APP_NAME = appInfo.appName;
APP_CITY = appInfo.appCity;
APP_STATE = appInfo.appState;
APP_COUNTRY = appInfo.appCountry;
ORGANIZER = appInfo.organization;
ORGANIZER_NAME = appInfo.OrganizerName;

TARGET_DIR = "/vagrant/appgen/sample";
KEYSTORE_NAME = "/vagrant/appgen/epihack-app-keys.keystore"
KEYSTORE_PASSWORD = "sample"
KEYSTORE_DNAME = "CN=" + ORGANIZER_NAME + ", OU=Unknown, O=" + ORGANIZER + ", L=" + APP_CITY + ", S=" + APP_STATE + ", C=" + APP_COUNTRY;
APK_DIR = TARGET_DIR + "/platforms/android/build/outputs/apk/"
UNSIGNED_APK = "android-release-unsigned.apk";
SIGNED_APK = APP_NAME + ".apk";
// TODO: why isn't environment variable coming through?
//ANDROID_BUILD_TOOLS_DIR = process.env.ANDROID_HOME + "/build_tools/22.0.1/"
ANDROID_BUILD_TOOLS_DIR = "/home/vagrant/android-sdk-linux/build-tools/22.0.1/"

run_cmd('cordova', ['build', '--release', 'android'], 
	{cwd: TARGET_DIR}, function(resp) { console.log(resp) });
run_cmd('keytool', ['-genkey', '-noprompt', '-keystore', KEYSTORE_NAME, '-keypass', KEYSTORE_PASSWORD, '-storepass', KEYSTORE_PASSWORD, '-alias', APP_NAME, '-dname', KEYSTORE_DNAME, '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000'], 
	{cwd: TARGET_DIR}, function(resp) { console.log(resp) });
run_cmd('jarsigner', ['-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1', '-keystore', KEYSTORE_NAME, '-keypass', KEYSTORE_PASSWORD, '-storepass', KEYSTORE_PASSWORD, UNSIGNED_APK, APP_NAME], 
	{cwd: APK_DIR}, function(resp) { console.log(resp) });
run_cmd(ANDROID_BUILD_TOOLS_DIR + 'zipalign', ['-v', '4', UNSIGNED_APK, SIGNED_APK], 
	{cwd: APK_DIR}, function(resp) { console.log(resp) });
