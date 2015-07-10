#!/bin/bash
# shell script to build the app
# Author: Julio Melo
# 7/9/2015
BUILD_PATH='./builds/'
GIT=$(which ionic)
LOG_FILE='build.log'
APP_NAME=$(date +%d%m%Y_%S)
echo 'Starting the build\n' > $LOG_FILE
# TODO
# + get json files of app skeleton
if [ ! -d $BUILD_PATH  ]; then
  mkdir $BUILD_PATH
fi
if [ -x $GIT ]; then
  cd $BUILD_PATH
  # TODO
  # add app name param
  echo "Creating app from apihack-ionoic repository\n" >> $LOG_FILE
  ionic start $APP_NAME https://github.com/opendream/epihack-ionoic
  echo "Done! App created\n" >> $LOG_FILE
else
  echo 'Please install ionic npm install -g ionic\n' >> $LOG_FILE
fi

ionic start new_test https://github.com/opendream/epihack-ionoic
