# Markdown Syntax Highlighting for Notepad++

> :star: **Notice for Coming Updates** (Nov/2017) :star:
>
> It is time to activate some updates for this repo. In the coming updates, it will focus on:
> - [ ] Migrate existing stable build (master branch) to `v2.0-beta`
> - [ ] Explore UDL 2.1 and seek for improvement (imply that it may not compatible to older Notepad++)
> - [ ] Will keep 2 channels: (1) Modern build (which is in beta) (2) Classic build (the current one)
> - [ ] I'd forgot to create a new branch for migration. This master branch will change a lot in these days. Sorry for any inconvenience
>
> If you have any concern, please hit a message in [Issues](https://github.com/Edditoria/markdown-plus-plus/issues) or in Twitter [@edditoria](https://twitter.com/edditoria).
> Thanks!

Default or Zenburn, your choice! :)

By default, Notepad++ doesn't provide syntax highlighting for Markdown.  
I use Markdown everyday, and I'm using a dark theme called Zenburn.  
So, I make one for myself, and share to the world.

If you are a Notepad++ and Markdown user, you may like it!

## Screenshot

| Your | Taste! |
|:----:|:------:|
| ![Markdown in Default Theme of Notepad++][screen_default] | ![Markdown in Zenburn Theme of Notepad++][screen_zenburn] |
| Default | Zenburn |
| ![Markdown in Blackboard Theme of Notepad++][screen_blackboard] | ![Markdown in Deep Black Theme of Notepad++][screen_deep_black] |
| Blackboard | Deep Black |

Supports file extensions: `.markdown` and `.md`  
Tested: Notepad++ v7.5.1 (Windows 10)

## Step Zero: Pick Your Side

In this latest release, there are 2 types of builds:

- **modern** build: The new build having better highlighting; restriction(s) on how you write Markdown.
- **classic** build: Long living in this repo since day 1 (v1.x); no restriction.

> *Note for current user*:
>
> You are probably using the "classic" build. The new "modern" build is trying to fix the limitation of *multiple em words*. If you have lots of docs using the following syntax, you may stick to "classic" build.

Difference between "modern" and "classic" builds:

|   | modern build | classic build |
|---|---|---|
| comes from | formerly `beta` branch | formerly `master` branch |
| \*multiple em words\* | parse ALL words | only parse the first word |
| \* asterisk-style bullet points | not support (use \- or \+ instead) | fully support |
| preview | ![modern build preview](/test-modern.png) | ![classic build preview](/test-modern-md-using-classic-UDL.png) |

## Usage

1. Choose one of the following Markdown language definition files. You can directly download using "save as":

	| Theme | modern | classic |
	|-------|:------:|:-------:|
	| Default | [userDefinedLang-markdown.default.modern.xml][default_modern_xml] | [userDefinedLang-markdown.default.classic.xml][default_classic_xml] |
	| Zenburn | [userDefinedLang-markdown.zenburn.modern.xml][zenburn_modern_xml] | [userDefinedLang-markdown.zenburn.classic.xml][zenburn_classic_xml] |
	| Blackboard | [userDefinedLang-markdown.blackboard.modern.xml][blackboard_modern_xml] | [userDefinedLang-markdown.blackboard.classic.xml][blackboard_classic_xml] |
	| Deep Black | [userDefinedLang-markdown.deep-black.modern.xml][deep_black_modern_xml] | [userDefinedLang-markdown.deep-black.classic.xml][deep_black_classic_xml] |

2. In Notepad++ menu, click `Language` and select `Define your language...` .
3. In User Defined Language windows, click `Import` then open the xml file.
4. Restart Notepad++.
5. Open and test with a Markdown file e.g. [test.classic.md][test_classic_file]

**Enjoy!!**

## Limitations

Need your input to solve the following problems:

- In modern build, `*em text*` only parse the first word because it will screw up unorder list
- In classic build, you can not use the asterisk-style bullet points (`* a bullet point`)
- `_em text_`, `__strong text__` and `___em strong text___` only parse the first word because it will screw up some URL contains `example__url`

## Build Script for Developers

From v1.1, a build script is provided for your convenience. It will follow the naming convention, and requires `bash` and `mustache.js` to run.

When you run at the first time:

```shell
# Check if mustache.js is able to run in current bash
mustache -v

# Check if the script works
source build.sh --help
```

![A Build Script To Help You Build Color Scheme][build_screen_1]

Build workflow:

1. Build a new color scheme: `source build.sh [new-name]` (no space, e.g. awesome-dark)
1. The script will create a new json file in a new folder:

	![Build script demo step 2][build_screen_2]

1. In the json file:
	- Change the name according to the theme, e.g. "Awesome Dark"
	- This name will be parsed into definition name in 2 XML files:
		- "Markdown (Awesome Dark)" for modern build
		- "Markdown [Awesome Dark]" for classic build
	- Add your prefered colors in the empty strings, e.g. "FFFFFF"

	![Build script demo step 3][build_screen_3]

1. Build XML files using the same command: `source build.sh [new-name]`

	> tips: Press :arrow_up: to show your previous command.

1. It builds 2 XML files in root directory of this repo.

	![Build script demo step 4][build_screen_4]

1. Import the XML files in Notepad++ for testing. It's cool, right?

	> tips: Since the old XML is not overwritten, you can import and compare two files in NPP.

1. Move the XML files into the corresponding theme folder. Done!

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


[screen_default]: /theme-default/markdown-plus-plus-default-screenshot.png "Markdown in Default Theme of Notepad++"
[screen_zenburn]: /theme-zenburn/markdown-plus-plus-zenburn-screenshot.png "Markdown in Zenburn Theme of Notepad++"
[screen_blackboard]: /theme-blackboard/markdown-plus-plus-blackboard-screenshot.png "Markdown in Blackboard Theme of Notepad++"
[screen_deep_black]: /theme-deep-black/markdown-plus-plus-deep-black-screenshot.png "Markdown in Deep Black Theme of Notepad++"

[default_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-default/userDefinedLang-markdown.default.modern.xml
[default_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-default/userDefinedLang-markdown.default.classic.xml
[zenburn_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-zenburn/userDefinedLang-markdown.zenburn.modern.xml
[zenburn_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-zenburn/userDefinedLang-markdown.zenburn.classic.xml
[blackboard_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-blackboard/userDefinedLang-markdown.blackboard.modern.xml
[blackboard_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-blackboard/userDefinedLang-markdown.blackboard.classic.xml
[deep_black_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-deep-black/userDefinedLang-markdown.deep-black.modern.xml
[deep_black_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-deep-black/userDefinedLang-markdown.deep-black.classic.xml

[this_repo]: https://github.com/Edditoria/markdown-plus-plus
[coffeescript]: https://github.com/Edditoria/coffeescript_npp_zenburn
[thomsmits]: https://github.com/thomsmits/markdown_npp
[thomsmits_npp]: https://github.com/thomsmits/markdown_npp
[test_classic_file]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/test.classic.md

[build_screen_1]: /build/markdown-plus-plus-build-screenshot-1.png "A Build Script To Help You Build Color Scheme"
[build_screen_2]: /build/markdown-plus-plus-build-screenshot-2.png "Build script demo step 2"
[build_screen_3]: /build/markdown-plus-plus-build-screenshot-3.png "Build script demo step 3"
[build_screen_4]: /build/markdown-plus-plus-build-screenshot-4.png "Build script demo step 4"
