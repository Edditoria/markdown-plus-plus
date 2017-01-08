# Markdown Syntax Highlighting for Notepad++

> **Important Notice:**
> 
> This URL of this repo is renamed! If you had forked this repo to your local machine, please update the remote:
> 
> ```shell
> # Check if my name exists
> git remote -v
> # e.g. origin https://github.com/Edditoria/markdown_npp_zenburn
> # If yes, please do: (replace origin if need, e.g. upstream)
> git remote set-url origin https://github.com/Edditoria/markdown_npp.git
> # Check if it is correct
> git remote -v
> ```
> 
> If you had shared this repo in social networks and web, please kindly **update the URL** to:
> 
> <https://github.com/Edditoria/markdown_npp>
> 
> Thanks!

Default or Zenburn, your choice! :)

By default, Notepad++ doesn't provide syntax highlighting for Markdown.  
I use Markdown everyday, and I'm using a dark theme called Zenburn.  
So, I make one for myself, and share to the world.

If you are a Notepad++ and Markdown user, you may like it!

## Screenshot

![Markdown in Default Theme of Notepad++][screen_default]
![Markdown in Zenburn Theme of Notepad++][screen_zenburn]
![Markdown in Blackboard Theme of Notepad++][screen_blackboard]
![Markdown in Deep Black Theme of Notepad++][screen_deep_black]

Supports file extensions: `.markdown` and `.md`  
Tested: Notepad++ v7.2.2 (Windows 10)

## Usage

1. Download the Markdown language definition file
  - **Default Theme** : [userDefineLang_markdown.xml][default_xml]
  - **Zenburn Theme** : [userDefineLang_markdown_zenburn.xml][zenburn_xml]
  - **Blackboard Theme** : [userDefineLang_markdown_blackboard.xml][blackboard_xml] :new:
  - **Deep Black Theme** : [userDefineLang_markdown_deep_black.xml][deep_black_xml] :new:
2. In Notepad++ menu, click `Language` and select `Define your language...` .
3. In User Defined Language windows, click `Import` then open the xml file.
4. Restart Notepad++.
5. Open and test with a Markdown file e.g. [test.md][test_file]

**Enjoy!!**

## Limitations

Need your input to solve the following problems:

- `*em text*` only parse the first word because it will screw up unorder list
- `_em text_`, `__strong text__` and `___em strong text___` only parse the first word because it will screw up some URL contains `example__url`

## Build Script for Developers

In v1.1, a build script is provided for your convenience. It will follow the naming convention. It requires `bash` and `mustache.js` to run.

![A Build Script To Help You Build Color Scheme][build_screen]

When you run at the first time:

```shell
# Check if mustache.js is able to run in current bash
mustache -v

# Check if the script works
source build.sh --help
```

Build workflow:

1. Build a new color scheme: `source build.sh [new_name]` (no space, e.g. awesome_dark)
1. The script will create a new json file in a new folder:

  ![Build script demo step 2][build_screen_2]

1. In the json file:
  - Change the name according to the theme, e.g. "Markdown (Awesome Dark)"
  - Add your prefered colors in the empty strings, e.g. "FFFFFF"
  
  ![Build script demo step 3][build_screen_3]
  
1. Build a XML file: `source build.sh [new_name]`

  > tips: Press :arrow_up: to show your previous command.
  
1. A new XML file is ready to serve in the root directory of this repo.
1. Import in Notepad++ for testing. It's cool, right?

  > tips: Since the old XML is not overwritten, you can prepare two files in NPP.
  
1. Move the XML file into the corresponding theme folder. Done!

## Contribution

*tl;tr* For pull request, please do check **Allow edits from maintainers**, and merge from **your new branch** into **my master branch**; Or, propose a file change in Github directly; Or, hit me a message via issue page or my social contacts.

For details, please kindly read [CONTRIBUTING.md](CONTRIBUTING.md).

:beer: Thank you so much! :pray:

## Note to Original Repo from [@thomsmits][thomsmits_npp]

Basically I revised the original repo from scratch.  
If you don't feel good in my settings, please comment.  
I'll try my best to improve.  
Or, use Thomsmits' current repo :)

## License

Copyright for portions of [this repository][this_repo] are held by Thomas Smits, 2010 as part of [his repository][thomsmits_npp]. All other copyright are held by Edditoria, 2012-2017.

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).


[screen_default]: /default_theme/markdown_npp_default_theme_screenshot.png "Markdown in Default Theme of Notepad++"
[screen_zenburn]: /zenburn_theme/markdown_npp_zenburn_screenshot.png "Markdown in Zenburn Theme of Notepad++"
[screen_blackboard]: /blackboard_theme/markdown_npp_blackboard_screenshot.png "Markdown in Blackboard Theme of Notepad++"
[screen_deep_black]: /deep_black_theme/markdown_npp_deep_black_screenshot.png "Markdown in Deep Black Theme of Notepad++"
[default_xml]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/default_theme/userDefineLang_markdown.xml
[zenburn_xml]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/zenburn_theme/userDefineLang_markdown_zenburn.xml
[blackboard_xml]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/blackboard_theme/userDefineLang_markdown_blackboard.xml
[deep_black_xml]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/deep_black_theme/userDefineLang_markdown_deep_black.xml

[this_repo]: https://github.com/Edditoria/markdown_npp
[coffeescript]: https://github.com/Edditoria/coffeescript_npp_zenburn
[thomsmits]: https://github.com/thomsmits/markdown_npp
[thomsmits_npp]: https://github.com/thomsmits/markdown_npp
[test_file]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/test.md

[build_screen]: /build/build_script_screenshot.png "A Build Script To Help You Build Color Scheme"
[build_screen_2]: /build/build_script_screenshot_2.png "Build script demo step 2"
[build_screen_3]: /build/build_script_screenshot_3.png "Build script demo step 3"
