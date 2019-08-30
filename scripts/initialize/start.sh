#!/bin/bash

set -e

echo "(~‾▿‾)~ Initializing your application for the first time"

echo "( ͡° ͜ʖ ͡°) It's settings time!"
exec < /dev/tty;
ts-node ./scripts/initialize/questions.ts

echo "\( ﾟヮﾟ)/ It's ready!"
rm -rf scripts/initialize