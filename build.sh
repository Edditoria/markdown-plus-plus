#!/bin/bash

function printHelp {
  echo "usage: source build.sh [themeName]"
  echo "example: . build.sh deep_black"
  echo ""
  echo "* require mustache.js https://www.npmjs.com/package/mustache"
}

if [ $# -eq 0 ] || [ $1 == "help" ] || [ $1 == "h" ]; then
  printHelp
else
  themeName="$1"
  dataFile="./${themeName}_theme/${themeName}_data.json"
  templateFile="./build_template.xml"
  outputFile="./userDefineLang_markdown_${themeName}.xml"

  mustache $dataFile $templateFile > $outputFile
fi

