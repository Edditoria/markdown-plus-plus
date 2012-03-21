# markdown_npp

## Overview

This project provides a very simple user-defined language file for Notepad++ that does some basic syntax highlighting for Markdown texts. It does **not** render text from Markdown into HTML (but there are scripts that can do that, too, Google is your friend).


## Usage

Notepad++ allows you to add new languages by adding language definitions to a userDefineLang.xml file. Add the Markdown definition like this:

1. Download the Markdown language definition file 
   [userDefineLang.xml](https://github.com/alderete-sfdc/markdown_npp/blob/master/userDefineLang.xml)
   from GitHub to your computer.
2. Click Start > Run, and type (or paste in) `%APPDATA%\Notepad++`, then click OK.
   This will open the settings directory for Notepad++.
3. If it does not already exist, copy the downloaded `userDefineLang.xml` 
   file into the Notepad++ settings directory. Skip to step 7.
4. If it _does_ exist, open the active `userDefineLang.xml` with a text editor.
5. Copy the contents of the Markdown definition file between the 
   `<UserLang...></UserLang>` tags into the active `userDefineLang.xml`, at the end right 
   before `</NotepadPlus>`.
6. Save `userDefineLang.xml`.
7. Restart Notepad++.


## Copyright and License

Copyright (c) 2010 Thomas Smits

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
