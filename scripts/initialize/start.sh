#!/bin/bash

echo "(~‾▿‾)~ Initializing your application for the first time"

echo "( ͡° ͜ʖ ͡°) It's settings time!"
ts-node ./scripts/initialize/questions.ts

echo "\( ﾟヮﾟ)/ It's ready!"
rm -rf scripts/initialize