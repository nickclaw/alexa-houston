#!/bin/bash

# prepare folders
./scripts/clean.sh
mkdir build lib

# setup build folder
node_modules/.bin/babel src --out-dir build
cp package.json .env deploy.env event.json build
