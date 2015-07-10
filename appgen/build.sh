#!/bin/bash
# shell script to build the app
# Author: Julio Melo
# 7/9/2015
BUILD_PATH='./builds/'
JSON_PATH='./www/'
GIT=$(which ionic)
LOG_FILE='build.log'
APP_NAME=$1-$(date +%d%m%Y_%S)
BASE_URL='http://url_to_api/endpoint/'
echo 'Starting the build\n' > $LOG_FILE

# TODO
# + get json files of app skeleton with curl
# + to use keytool to generate our private key
if [ ! -d $BUILD_PATH  ]; then
  mkdir $BUILD_PATH
fi
if [ ! -x $(which cordova) ]; then
  echo 'Please install ionic npm install -g cordova\n' >> $LOG_FILE
  exit 2
fi
if [ -x $(which ionic) ]; then
  cd $BUILD_PATH
  # TODO
  # add app name param
  echo "Creating app from apihack-ionoic repository\n" >> $LOG_FILE
  ionic start $APP_NAME https://github.com/opendream/epihack-ionoic
  cordova build --release android
  # keytool -genkey -noprompt -keystore keyStore -keypass keyPass -storepass keyPass -alias $APP_NAME -dname keyDname, '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000']
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore appgenerator.keystore $APP_NAME-release-unsigned.apk appgenerator
  zipalign -v 4 $APP_NAME-release-unsigned.apk $APP_NAME.apk
  echo "Done! App created\n" >> $LOG_FILE
  exit 0
else
  echo 'Please install ionic npm install -g ionic\n' >> $LOG_FILE
  exit 2
fi
# ionic start new_test https://github.com/opendream/epihack-ionoic
