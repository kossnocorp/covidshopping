#!/bin/bash

set -e

echo "(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ Installing dependencies"

# Install asdf dependencies if asdf if present
which asdf > /dev/null && asdf install
yarn