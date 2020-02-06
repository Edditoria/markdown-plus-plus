# Markdown Syntax Highlighting for Notepad++

Writing docs in Markdown is common today, but Notepad++ doesn't provide syntax highlighting for Markdown by default. That's why this repo exists.

This repo `markdown-plus-plus` is a **collection of User Defined Language XML files for Markdown syntax highlighting in Notepad++**. You download a file that matches your favorite theme, import in Notepad++, and then you are good to go.

Thanks for encouragements and comments. This repo is not only for myself anymore. It's for everyone.

If you are a Notepad++ and Markdown user, this is made for you.

## Screenshot

| Your | Taste! |
|:----:|:------:|
| ![Markdown in Default Theme of Notepad++][screen_default] | ![Markdown in Zenburn Theme of Notepad++][screen_zenburn] |
| Default | Zenburn |
| ![Markdown in Blackboard Theme of Notepad++][screen_blackboard] | ![Markdown in Deep Black Theme of Notepad++][screen_deep_black] |
| Blackboard | Deep Black |
| ![Markdown in Solarized Theme of Notepad++][screen_solarized] | ![Markdown in Solarized-light Theme in Notepad++][screen_solarized_light] |
| Solarized :new: | Solarized-light :new: |

Supports file extensions: `.markdown` and `.md`<br>
Tested: Notepad++ v7.6.2 Yellow Vest Edition 32-bit (Windows 10 64-bit)<br>
![Notepad++ Yellow Vest logo](https://notepad-plus-plus.org/assets/images/logo_lwc_def_gillet-jaune_sanstxt.png "Notepad++ Yellow Vest logo")

> "Our civilization is being sacrificed to the opportunity for a very small number of people to continue making enormous amounts of money." -- <cite>[Greta Thunberg at UN COP 24](https://www.youtube.com/watch?v=VFkQSGyeCWg)</cite>

## Step Zero: Pick Your Side

In this latest release, there are 2 types of builds:

- **modern** build: The new build having better highlighting; restriction(s) on how you write Markdown.
- **classic** build: Long living in this repo since day 1 (v1.x); no restriction.

Difference between "modern" and "classic" builds:

|   | modern build | classic build |
|---|---|---|
| comes from | formerly `beta` branch | formerly `master` branch |
| \*multiple em words\* | parse ALL words | only parse the first word |
| \* asterisk-style bullet points | not support (use \- or \+ instead) | fully support |
| preview | ![modern build preview](docs/images/test-modern.png) | ![classic build preview](docs/images/test-modern-md-using-classic-UDL.png) |

## Usage

1. Choose one of the following Markdown language definition files. You can directly download using "save as":

	| Theme | modern | classic |
	|-------|:------:|:-------:|
	| Default | [userDefinedLang-markdown.default.modern.xml][default_modern_xml] | [userDefinedLang-markdown.default.classic.xml][default_classic_xml] |
	| Zenburn | [userDefinedLang-markdown.zenburn.modern.xml][zenburn_modern_xml] | [userDefinedLang-markdown.zenburn.classic.xml][zenburn_classic_xml] |
	| Blackboard | [userDefinedLang-markdown.blackboard.modern.xml][blackboard_modern_xml] | [userDefinedLang-markdown.blackboard.classic.xml][blackboard_classic_xml] |
	| Deep Black | [userDefinedLang-markdown.deep-black.modern.xml][deep_black_modern_xml] | [userDefinedLang-markdown.deep-black.classic.xml][deep_black_classic_xml] |
	| Solarized :new: | [userDefinedLang-markdown.solarized.modern.xml][solarized_modern_xml] | [userDefinedLang-markdown.solarized.classic.xml][solarized_classic_xml] |
	| Solarized-light :new: | [userDefinedLang-markdown.solarized-light.classic.xml][solarized_light_modern_xml] | [userDefinedLang-markdown.solarized-light.classic.xml][solarized_light_classic_xml] |

2. In Notepad++ menu, click `Language` and select `Define your language...` .
3. In User Defined Language windows, click `Import` then open the xml file.
4. Restart Notepad++.
5. Open and test with a Markdown file e.g. [test.classic.md][test_classic_file]

**Enjoy!!**

## Limitations

Need your input to solve the following problems:

- `_em text_`, `__strong text__` and `___em strong text___` only parse the first word because it will screw up some URL contains `example__url`
- In modern build, you can not use the asterisk-style bullet points (`* a bullet point`)
- In classic build, `*em text*` only parse the first word because it will screw up unorder list

## Build Script for Developers

From v1.1, a build script is provided for your convenience. For details, please read the document: [build-workflow.md](docs/build-workflow.md)

## Options :new:

In v2.1.0, the build script adds supports of extra stuff besides Markdown:

- **"extraHighlight":** Will highlight HEX value. It is not a Markdown syntax but eye candy.
- **"transparentBg":** In original theme, each text has background of a specific color. `"transparentBg": true` will take out the background color. Good for customized theme.

You can change their value in json files. Then run the build script to produce the XML file you need.

As usual, you need npm to run the build script. Feel free to contact me if you need help.

## Contribution

*tl;tr* For pull request, please do check **Allow edits from maintainers**, and merge from **your new branch** into **my master branch**; Or, propose a file change in Github directly; Or, hit me a message via issue page or my social contacts.

For details, please kindly read [CONTRIBUTING.md](CONTRIBUTING.md).

:beer: Thank you so much! :pray:

## Copyright and License

Copyright for portions of [this repository][this_repo] are held by Thomas Smits, 2010 as part of [his repository][thomsmits_npp]. All other copyright are held by Edditoria, 2012-2020.

Code released under the [MIT License](LICENSE.txt). Docs released under [Creative Commons](https://creativecommons.org/licenses/by/4.0/).

As human-readable summary (but not a substitute for the license):

You can use it, share it, modify the codes and distribute your work for private and commercial uses. If you like, please share your work with me. :pizza:


[screen_default]: theme-default/markdown-plus-plus-default-screenshot.png "Markdown in Default Theme of Notepad++"
[screen_zenburn]: theme-zenburn/markdown-plus-plus-zenburn-screenshot.png "Markdown in Zenburn Theme of Notepad++"
[screen_blackboard]: theme-blackboard/markdown-plus-plus-blackboard-screenshot.png "Markdown in Blackboard Theme of Notepad++"
[screen_deep_black]: theme-deep-black/markdown-plus-plus-deep-black-screenshot.png "Markdown in Deep Black Theme of Notepad++"
[screen_solarized]: theme-solarized/markdown-plus-plus-solarized-screenshot.png "Markdown in Solarized Theme of Notepad++"
[screen_solarized_light]: theme-solarized-light/markdown-plus-plus-solarized-light-screenshot.png "Markdown in Solarized-light Theme of Notepad++"

[default_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-default/userDefinedLang-markdown.default.modern.xml
[default_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-default/userDefinedLang-markdown.default.classic.xml
[zenburn_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-zenburn/userDefinedLang-markdown.zenburn.modern.xml
[zenburn_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-zenburn/userDefinedLang-markdown.zenburn.classic.xml
[blackboard_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-blackboard/userDefinedLang-markdown.blackboard.modern.xml
[blackboard_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-blackboard/userDefinedLang-markdown.blackboard.classic.xml
[deep_black_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-deep-black/userDefinedLang-markdown.deep-black.modern.xml
[deep_black_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-deep-black/userDefinedLang-markdown.deep-black.classic.xml
[solarized_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-solarized/userDefinedLang-markdown.solarized.modern.xml
[solarized_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-solarized/userDefinedLang-markdown.solarized.classic.xml
[solarized_light_modern_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-solarized-light/userDefinedLang-markdown.solarized-light.modern.xml
[solarized_light_classic_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-solarized-light/userDefinedLang-markdown.solarized-light.classic.xml

[this_repo]: https://github.com/Edditoria/markdown-plus-plus
[coffeescript]: https://github.com/Edditoria/coffeescript_npp_zenburn
[thomsmits]: https://github.com/thomsmits/markdown_npp
[thomsmits_npp]: https://github.com/thomsmits/markdown_npp
[test_classic_file]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/test/test.classic.md
