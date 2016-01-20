#!/bin/bash

mkdir build lib
node_modules/.bin/babel src --out-dir lib
node_modules/.bin/browserify lib/index.js --bare > build/index.js
