#!/bin/bash

function print_help {
  echo "usage: source build.sh [theme_name]"
  echo "example: . build.sh deep_black"
  echo ""
  echo "* require mustache.js (npm install -g mustache)"
}
function make_file {
  mustache $data_file $template_file > $output_file
  echo "File is created: $output_file"
}

if [ $# -eq 0 ] || [ $1 == "help" ] || [ $1 == "-help" ] || [ $1 == "-h" ] || [ $1 == "h" ]; then
  # when arg is help or empty
  print_help
else
  theme_name="$1"
  data_file="./${theme_name}_theme/${theme_name}_data.json"
  template_file="./build_template.xml"
  if [ $1 == "default" ]; then
    output_file="./userDefineLang_markdown.xml"
  else
    output_file="./userDefineLang_markdown_${theme_name}.xml"
  fi
  
  if [ ! -f $data_file ]; then
    # when $data_file is missing
    echo "Error: cannot find the source or folder."
    echo ""
    print_help
  elif [ -f $output_file ]; then
    # when output file is already existed
    read -p "File already existed. Overwrite? [y|N]" answer
    if [[ $answer =~ ^(Y|y|Yes|yes) ]]; then
      make_file
    else
      echo "Aborted."
    fi
  else
    make_file
  fi
fi

