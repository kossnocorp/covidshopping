#!/bin/bash

export PATH="$PATH:$(npm bin)"

if [ -n "$SKIP_INIT" ]; then
  exit 0
fi

set -e

echo "(~‾▿‾)~ Initializing your application for the first time"
git stash

echo "｡(-‿•)｡ Installing fresh dependecies"
npm i --save firebase@latest firebase-admin@latest firebase-functions@latest firebun@latest

echo "( ͡° ͜ʖ ͡°) It's settings time!"
ts-node ./scripts/initialize/questions.ts

# Remove the scripts, so this script won't run on make start
rm -rf scripts/initialize

echo "(｡◕‿‿◕｡) Creating git commit with the initial config"
git add app/config/index.ts scripts/initialize bun.config.ts
git commit -m 'ᕕ( ᐛ )ᕗ Initialize the app'
git stash pop

echo "\( ﾟヮﾟ)/ It's ready!"