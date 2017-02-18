#!/bin/bash
if [ -d ./dist ]
then
  rm -Rf ./dist
  mkdir ./dist
fi

cp -Rf ./src/* ./dist
