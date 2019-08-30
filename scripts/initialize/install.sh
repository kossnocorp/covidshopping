#!/bin/bash

set -e

PROJECT_DIR=$1

if [ -z "$PROJECT_DIR" ]
then
  echo "(•̀o•́)ง Project directory is missing! Please pass directory name as the first argument, e.g.: "
  echo "  curl git.io/fjxEB | sh -s project-name"
  exit 1
fi

echo "─=≡Σ((( つ◕ل͜◕)つ Creating Firebun project in ./$PROJECT_DIR"

git clone --origin template https://github.com/kossnocorp/firebun-app.git $PROJECT_DIR
cd $PROJECT_DIR

make start