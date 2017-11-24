#!/bin/bash

function print_help {
  echo "Usage: source build.sh [theme-name]"
  echo "Build UDL xml file in root directory of this repo."
  echo ""
  echo "Example      : . build.sh deep-black"
  echo "Display help : . build.sh help"
  echo ""
  echo "* This script requires mustache.js (npm install -g mustache)"
  echo ""
}
function make_file {
  mustache $data_file $template_file > $output_file
  echo "File is created: $output_file"
}

if [ $# -eq 0 ] || [[ $1 =~ ^("help"|"--help"|"-h"|"h") ]]; then
  # when arg is help or empty
  print_help
else
  # setup variables
  theme_name="$1"
  data_file="./theme-${theme_name}/data.${theme_name}.json"
  template_file="./build/userDefinedLang-markdown.template.modern.xml"
  template_data="./build/data.template.json"
  output_file="./userDefinedLang-markdown.${theme_name}.modern.xml"

  # main part of this script
  if [ ! -f $data_file ]; then
    # when $data_file is missing
    echo "Cannot find the source or directory."
    echo ""
    read -p "Are you going to create a new color scheme \"${theme_name}\"? [y|N] " answer
    if [[ $answer =~ ^(Y|y|Yes|yes) ]]; then
      printf "Creating folder..."
      mkdir "./theme-${theme_name}"
      echo "[done]"
      printf "Creating template json file..."
      cp ${template_data} ${data_file}
      echo "[done]"
      echo ""
    else
      echo "Aborted."
      echo ""
      print_help
    fi
  elif [ -f $output_file ]; then
    # when output file is already existed
    read -p "File already existed. Overwrite? [y|N] " answer
    if [[ $answer =~ ^(Y|y|Yes|yes) ]]; then
      make_file
    else
      echo "Aborted."
    fi
  else
    make_file
  fi
fi
