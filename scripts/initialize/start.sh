#!/bin/bash

echo "(~‾▿‾)~ Initializing your application for the first time"

echo "(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ Let's install dependencies first!"
make install

echo "( ͡° ͜ʖ ͡°) Now, it's settings time!"
ts-node ./scripts/initialize/questions.ts

echo "\( ﾟヮﾟ)/ It's ready!"
rm -rf scripts/initialize