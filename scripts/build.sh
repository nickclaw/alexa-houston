#!/bin/bash

# prepare folders
./scripts/clean.sh
mkdir build lib

# build files
node_modules/.bin/babel src --out-dir lib
node_modules/.bin/browserify lib/index.js --bare --standalone handler > build/index.js

# compress files
cd build
zip -r lambda.zip .
