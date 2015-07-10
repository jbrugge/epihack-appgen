#!/bin/bash
# shell script to build the app
# Author: Julio Melo
# 7/9/2015
BUILD_PATH='./builds/'
JSON_PATH='./www/'
GIT=$(which ionic)
LOG_FILE='build.log'
APP_NAME=$(date +%d%m%Y_%S)
BASE_URL='http://url_to_api/endpoint/'
echo 'Starting the build\n' > $LOG_FILE

# TODO
# + get json files of app skeleton with curl
# + send e-mail with attach apk to publishing .apk
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
  echo "Done! App created\n" >> $LOG_FILE
  exit 0
else
  echo 'Please install ionic npm install -g ionic\n' >> $LOG_FILE
  exit 2
fi
# ionic start new_test https://github.com/opendream/epihack-ionoic
