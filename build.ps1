
function print_help {
  Write-Output "Usage: source build.ps1 [theme_name]"
  Write-Output "Build UDL xml file in root directory of this repo."
  Write-Output ""
  Write-Output "Example      : . build.ps1 deep_black"
  Write-Output "Display help : . build.ps1 help"
  Write-Output ""
  Write-Output "* This script requires mustache.js (npm install -g mustache)"
  Write-Output ""
}
function make_file {
  mustache $data_file $template_file | Out-File $output_file -Encoding ASCII
  Write-Output "File is created: $output_file"
}

if ( $args.Length -eq 0 -or "$args" -match '^([-/]{0,1}|--)(h$|help$)' ){
  # when arg is help or empty
  print_help
}else{
  # setup variables
  $theme_name="$args"
  $data_file="./${theme_name}_theme/${theme_name}_data.json"
  $template_file="./build/build_template.xml"
  $template_data="./build/build_data_template.json"
  if ( "$args" -eq "default" ){
    $output_file="./${theme_name}_theme/userDefineLang_markdown.xml"
  }else{
    $output_file="./${theme_name}_theme/userDefineLang_markdown_${theme_name}.xml"
  }
  
  # main part of this script
  if ( -not(Test-Path $data_file -PathType Leaf) ){
    # when $data_file is missing
    Write-Output "Cannot find the source or directory."
    Write-Output ""
    $answer = Read-Host -Prompt  "Are you going to create a new color scheme ${theme_name}? [y|N] "
    if ( "$answer" -match '^y(es)?$' ){
      Write-Host -NoNewline "Creating folder..."
      New-Item -ItemType directory -Path ./${theme_name}_theme | Out-Null
      Write-Output "[done]"
      Write-Host -NoNewline "Creating template json file..."
      Copy-Item ${template_data} ${data_file}
      Write-Output "[done]"
      Write-Output ""
    }else{
      Write-Output "Aborted."
      Write-Output ""
      print_help
    }
  }elseif ( Test-Path $output_file -PathType Leaf ){
    # when output file is already existed
   $answer = Read-Host -Prompt  "Are you going to create a new color scheme ${theme_name}? [y|N] "
    if ( "$answer" -match '^y(es)?$' ){
      make_file
    }else{
      Write-Output "Aborted."
    }
  }else{
    make_file
  }
}

