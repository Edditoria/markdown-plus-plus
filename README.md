# Markdown Syntax Highlighting for Notepad++

> :star: **Notice for Coming Updates** (Nov/2017) :star:
>
> It is time to activate some updates for this repo. In the coming updates, it will focus on:
> - [ ] Migrate existing stable build (master branch) to `v2.0-beta`
> - [ ] Explore UDL 2.1 and seek for improvement (imply that it may not compatible to older Notepad++)
> - [ ] Will keep 2 channels: (1) Modern build (which is in beta) (2) Classic build (the current one)
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
Tested: Notepad++ v7.2.2 (Windows 10)

# [beta] Markdown Syntax Highlighting for Notepad++

This beta version will fix a limitation of *multiple em words*

However, due to limitation in UDL of Notepad++, it need to sacrifice bullet points by \* (asterisks) keyword.

I still need time to confirm if **this version will mess up other things?** Please kindly evaluate it. :)

In short:

|   | Stable (master branch) | Beta (this branch) |
|---|---|---|
| \*multiple em words\* | only parse the first word | parse ALL words |
| \* bullet points | fully support | not support (use \- or \+ instead) |

## Usage

1. Download the Markdown language definition file
  - **Default Theme** : [userDefinedLang-markdown.default.classic.xml][default_xml]
  - **Zenburn Theme** : [userDefinedLang-markdown.zenburn.classic.xml][zenburn_xml]
  - **Blackboard Theme** : [userDefinedLang-markdown.blackboard.classic.xml][blackboard_xml] :new:
  - **Deep Black Theme** : [userDefinedLang-markdown.deep-black.classic.xml][deep_black_xml] :new:
2. In Notepad++ menu, click `Language` and select `Define your language...` .
3. In User Defined Language windows, click `Import` then open the xml file.
4. Restart Notepad++.
5. Open and test with a Markdown file e.g. [test.classic.md][test_classic_file]

**Enjoy!!**

## Limitations

Need your input to solve the following problems:

- `*em text*` only parse the first word because it will screw up unorder list
- `_em text_`, `__strong text__` and `___em strong text___` only parse the first word because it will screw up some URL contains `example__url`

## Build Script for Developers

In v1.1, a build script is provided for your convenience. It will follow the naming convention. It requires `bash` and `mustache.js` to run.

![A Build Script To Help You Build Color Scheme][build_screen_1]

When you run at the first time:

```shell
# Check if mustache.js is able to run in current bash
mustache -v

# Check if the script works
source build.sh --help
```

Build workflow:

1. Build a new color scheme: `source build.sh [new-name]` (no space, e.g. awesome-dark)
1. The script will create a new json file in a new folder:

  ![Build script demo step 2][build_screen_2]

1. In the json file:
  - Change the name according to the theme, e.g. "Markdown (Awesome Dark)"
  - Add your prefered colors in the empty strings, e.g. "FFFFFF"

  ![Build script demo step 3][build_screen_3]

1. Build a XML file: `source build.sh [new-name]`

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


[screen_default]: /theme-default/markdown-plus-plus-default-screenshot.png "Markdown in Default Theme of Notepad++"
[screen_zenburn]: /theme-zenburn/markdown-plus-plus-zenburn-screenshot.png "Markdown in Zenburn Theme of Notepad++"
[screen_blackboard]: /theme-blackboard/markdown-plus-plus-blackboard-screenshot.png "Markdown in Blackboard Theme of Notepad++"
[screen_deep_black]: /theme-deep-black/markdown-plus-plus-deep-black-screenshot.png "Markdown in Deep Black Theme of Notepad++"
[default_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-default/userDefinedLang-markdown.default.classic.xml
[zenburn_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-zenburn/userDefinedLang-markdown.zenburn.classic.xml
[blackboard_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-blackboard/userDefinedLang-markdown.blackboard.classic.xml
[deep_black_xml]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/theme-deep-black/userDefinedLang-markdown.deep-black.classic.xml

[this_repo]: https://github.com/Edditoria/markdown-plus-plus
[coffeescript]: https://github.com/Edditoria/coffeescript_npp_zenburn
[thomsmits]: https://github.com/thomsmits/markdown_npp
[thomsmits_npp]: https://github.com/thomsmits/markdown_npp
[test_classic_file]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/test.classic.md

[build_screen_1]: /build/markdown-plus-plus-build-screenshot-1.png "A Build Script To Help You Build Color Scheme"
[build_screen_2]: /build/markdown-plus-plus-build-screenshot-2.png "Build script demo step 2"
[build_screen_3]: /build/markdown-plus-plus-build-screenshot-3.png "Build script demo step 3"
