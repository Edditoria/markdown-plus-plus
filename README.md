# Markdown Syntax Highlighting for Notepad++

> **Important Notice:**
> 
> This URL of this repo is renamed! If you had forked this repo to your local machine, please update the remote:
> 
> ```shell
> # Check if my name exists
> git remote -v
> # e.g. origin https://github.com/Edditoria/markdown_npp_zenburn
> # If yes, please do:
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

![Markdown in Zenburn Theme of Notepad++](https://raw.githubusercontent.com/Edditoria/markdown_npp_zenburn/master/zenburn_theme/markdown_npp_zenburn_screenshot.png)  
![Markdown in Default Theme of Notepad++](https://raw.githubusercontent.com/Edditoria/markdown_npp_zenburn/master/default_theme/markdown_npp_default_theme_screenshot.png)

Supports file extensions: `.markdown` and `.md`  
Tested: Notepad++ v6.9.1 (Windows 7)

I also created *Coffeescript syntax highlighting*: [link][coffeescript] (for Zenburn theme only)

## How to Use?

1. Download the Markdown language definition file
     - **Zenburn Theme** : [userDefineLang_markdown_zenburn.xml][zenburn_xml]
     - **Default Theme** : [userDefineLang_markdown.xml][default_xml]
2. In Notepad++ menu, click `Language` and select `Define your language...` .
3. In User Defined Language windows, click `Import` then open the xml file.
4. Restart Notepad++.
5. Open and test with a Markdown file e.g. [test.md][test_file]

**Enjoy!!**

## Limitations

Need your input to solve the following problems:

- `*em text*` only parse the first word because it will screw up unorder list
- `_em text_`, `__strong text__` and `___em strong text___` only parse the first word because it will screw up some URL contains `example__url`

## Please Comment

If bugs occurs or you have problems, please report the issue.

If you have any suggestion, feel free to connect me [@Edditoria][twitter] | [facebook][fb] | [G+][gplus].

## Note to Original Repo from [@thomsmits][thomsmits_npp]

Basically I revised the original repo from scratch.  
If you don't feel good in my settings, please comment.  
I'll try my best to improve.  
Or, use Thomsmits' current repo :)

## License

Copyright for portions of [this repository][this_repo] are held by Thomas Smits, 2010 as part of [his repository][thomsmits_npp]. All other copyright are held by Edditoria, 2012-2017.

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[this_repo]: https://github.com/Edditoria/markdown_npp
[coffeescript]: https://github.com/Edditoria/coffeescript_npp_zenburn
[thomsmits]: https://github.com/thomsmits/markdown_npp
[thomsmits_npp]: https://github.com/thomsmits/markdown_npp
[screen_zenburn]: /zenburn_theme/markdown_npp_zenburn_screenshot.png "Markdown in Zenburn Theme of Notepad++"
[screen_default]: /default_theme/markdown_npp_default_theme_screenshot.png "Markdown in Default Theme of Notepad++"
[zenburn_xml]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/zenburn_theme/userDefineLang_markdown_zenburn.xml
[default_xml]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/default_theme/userDefineLang_markdown.xml
[test_file]: https://raw.githubusercontent.com/Edditoria/markdown_npp/master/test.md
[twitter]: http://twitter.com/Edditoria
[fb]: http://www.facebook.com/Edditoria
[gplus]: https://plus.google.com/109579889772726782010/about
