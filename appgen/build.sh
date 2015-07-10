#!/bin/bash
# shell script to build the app
# Author: Julio Melo
# 7/9/2015
BUILD_PATH='./builds/'
GIT=$(which ionic)
echo -n 'Starting the build'
if [ ! -d $BUILD_PATH  ]; then
  mkdir $BUILD_PATH
fi
if [ -x $GIT ]; then
  cd $BUILD_PATH
  # TODO
  # add app name param
  ionic start ionicTest https://github.com/opendream/epihack-ionoic
else
  echo 'Please install ionic. apt-get install git-core'
fi
git clone
pwd
