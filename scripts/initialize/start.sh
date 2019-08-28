#!/bin/bash

echo '(~‾▿‾)~ Initializing your application for the first time'
echo "(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ Let's install dependencies first!"

# Install asdf dependencies if asdf if present
# which asdf > /dev/null && asdf install
# yarn

echo "( ͡° ͜ʖ ͡°) Now, it's settings time!"

ts-node ./scripts/initialize/questions.ts

exit 1

# rm -rf scripts/initialize