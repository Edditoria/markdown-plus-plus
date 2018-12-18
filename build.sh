#!/bin/bash

function print_help {
	echo "Usage: source build.sh [theme-name]"
	echo "Build UDL xml file in root directory of this repo."
	echo ""
	echo "Examples: . build.sh awesome-black"
	echo "          . build.sh lite-default"
	echo ""
	echo "* This script requires mustache.js (npm install -g mustache)"
	echo ""
}
function make_file {
	# argument $1: "modern" or "classic"
	build_version="$1"
	template_file="./build/userDefinedLang-markdown.template.${build_version}.xml"
	output_file="./userDefinedLang-markdown.${theme_name}.${build_version}.xml"
	echo "Creating file: ${output_file}..."
	if [ -f $output_file ]; then
		# when output file is already existed
		read -p "File already existed. Overwrite? [y|N] " answer
		if [[ $answer =~ ^(Y|y|Yes|yes) ]]; then
			mustache $data_file $template_file > $output_file
			echo "File is overwritten"
		else
			echo "Aborted."
		fi
	else
		mustache $data_file $template_file > $output_file
		echo "File is created"
	fi
}

if [ $# -eq 0 ] || [[ $1 =~ ^("help"|"--help"|"-h"|"h") ]]; then
	# when arg is help or empty
	print_help
else
	# setup variables
	theme_name="$1"
	data_file="./theme-${theme_name}/data.${theme_name}.json"
	template_data="./build/data.template.json"

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
	else
		make_file modern
		make_file classic
	fi
fi
