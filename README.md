# Markdown Syntax Highlighting for Notepad++

Default or Zenburn, your choice! :)

By default, Notepad++ doesn't provide syntax highlighting for Markdown.  
I use them everyday, and I'm using a dark theme called Zenburn.  
So, I make one for myself, and share to the world.

If you are a Notepad++ and Markdown user, you may like it!

## Screenshot

![Markdown in Zenburn Theme of Notepad++](https://raw.githubusercontent.com/Edditoria/markdown_npp_zenburn/master/zenburn_theme/markdown_npp_zenburn_screenshot.png)  
![Markdown in Default Theme of Notepad++](https://raw.githubusercontent.com/Edditoria/markdown_npp_zenburn/master/default_theme/markdown_npp_default_theme_screenshot.png)

Supports file extensions: `.markdown` and `.md`  
Tested: Notepad++ v6.2 (Windows)

I also created *Coffeescript syntax highlighting*:  
[link][coffeescript] (only Zenburn)

## How to Use?

You need to modify a file `userDefineLang.xml` in your Notepad++ program folder.  

1. Download the Markdown language definition file
     - **Zenburn Theme** : [userDefineLang.xml][zenburn_xml]
     - **Default Theme** : [userDefineLang.xml][default_xml]
2. Find out your Notepad++ program folder/directory.
3. There may be a file called `userDefineLang.xml`
     - If it does _not_ already exist, copy the XML file to the folder.
     - If it _does_ exist, you need to edit your xml file manually:
       - open the active `userDefineLang.xml` with a text editor.
       - Copy the contents of the Markdown definition file between the `<UserLang...></UserLang>` tags into the active `userDefineLang.xml`, at the end right before `</NotepadPlus>`.
       - Save `userDefineLang.xml`.
4. Restart Notepad++.

**Enjoy!!**

## Please Comment

If bugs occurs or you have problems, please report the issue.

If you have any suggestion, feel free to connect me [@Edditoria][twitter] | [facebook][fb] | [G+][gplus].

## Note to Original Repo from @thomsmits

Basically I revised the original repo from scratch.  
If you don't feel good in my settings, please comment.  
I'll try my best to improve.  
Or, use his current repo :)

## Copyright Notice

This repository is forked from [thomsmits][tomes]

*You may take it, use it, modify it, but you should not sell it.*

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[coffeescript]: https://github.com/Edditoria/coffeescript_npp_zenburn
[tomes]: https://github.com/thomsmits/markdown_npp
[screen_zenburn]: /Edditoria/markdown_npp_zenburn/raw/master/zenburn_theme/markdown_npp_zenburn_screenshot.png "Markdown in Zenburn Theme of Notepad++"
[screen_default]: /Edditoria/markdown_npp_zenburn/raw/master/default_theme/markdown_npp_default_theme_screenshot.png "Markdown in Default Theme of Notepad++"
[zenburn_xml]: /Edditoria/markdown_npp_zenburn/blob/master/zenburn_theme/userDefineLang.xml
[default_xml]: /Edditoria/markdown_npp_zenburn/blob/master/default_theme/userDefineLang.xml
[twitter]: http://twitter.com/Edditoria
[fb]: http://www.facebook.com/Edditoria
[gplus]: https://plus.google.com/109579889772726782010/about
