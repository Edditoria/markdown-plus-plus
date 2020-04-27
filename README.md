# Markdown Syntax Highlighting for Notepad++

Writing docs in Markdown is common today, but Notepad++ doesn't provide syntax highlighting for Markdown by default. That's why this repo exists.

This repo "markdown-plus-plus" is a **collection of User Defined Language XML files for Markdown syntax highlighting in Notepad++**. You download this package. Import a file that matches your favorite theme, and then you are good to go.

Thanks for encouragements and comments. This repo is not only for myself anymore. It's for everyone.

If you are a Notepad++ and Markdown user, this is made for you.

## Key Changes from v2 to v3 :new:

- Markdown-plus-plus is a npm package now. You can fetch the UDL files in command line directly, `npx markdown-plus-plus --help`.
- Build system relies on Node.js. `git clone` then `npm install` to develop this repo. Less dependency hell.
- In v2, there are 2 builds for every themes: Modern and classic. Now, there are only 1 build. The main difference in classic build, [asterisk-style bullet points](https://github.com/Edditoria/markdown-plus-plus/tree/ref/end-of-v2#step-zero-pick-your-side), becomes an option in v3.
- Better file structure:
	- You can find all UDL files in one single folder called `<udl/>`.
	- You can modify the config files in another folder called `<config/>`.
	- Filename for UDLs follows the pattern: `<markdown.[theme-name].udl.xml>`.
	- Filename for configs follows this pattern: `<markdown.[theme-name].config.json>`

## Screenshot

| Your | Taste! |
|:----:|:------:|
| ![Markdown in Default Theme of Notepad++][screen_default] | ![Markdown in Zenburn Theme of Notepad++][screen_zenburn] |
| Default | Zenburn |
| ![Markdown in Bespin Theme of Notepad++][screen_bespin] | ![Markdown in Blackboard Theme of Notepad++][screen_blackboard] |
| Bespin | Blackboard |
| ![Markdown in Deep Black Theme of Notepad++][screen_deep_black] | ![Markdown in Obsidian Theme of Notepad++][screen_obsidian] |
| Deep Black | Obsidian |
| ![Markdown in Solarized Theme of Notepad++][screen_solarized] | ![Markdown in Solarized-light Theme in Notepad++][screen_solarized_light] |
| Solarized | Solarized-light |

Supports file extensions: `.markdown` and `.md`<br>
Tested: Notepad++ v7.8.4 32-bit (on Windows 10 64-bit)

## Usage

### Node.js

If you had installed Node.js in your system, you can use `npx` command to get UDL file(s):

```cmd
:: Check whether you have Node.js installed
node -v

:: Go to UDL folder of Notepad++
cd %AppData%\Notepad++\userDefineLangs

:: Example: Download Zenburn UDL file
npx markdown-plus-plus zenburn

:: Read help for details
npx markdown-plus-plus --help
```

### Download Manually

1. Download the source code in [latest release page][latest_release]. It should be a zip file.
1. Open the zip file and go to `<udl/>` folder.
1. Copy a XML file of your favorite theme, and paste in `<userDefineLangs/>` folder of Notepad++.
1. Restart Notepad++.
1. Open and test with a Markdown file e.g. [test.classic.md][test_classic_file].

**Enjoy!!**

## Limitations

Need your input to solve the following problems:

- `_em text_`, `__strong text__` and `___em strong text___` only parse the first word because it will screw up some URL contains `example__url`.
- Cannot use asterisk-style bullet points (`* a \<li\> bullet point`). Instead, please write in `- a bullet point` or `+ a bullet point`.
- Improve documentation. My English sucks. (\*´ｰ`\*)

## Build Your Own UDL Files

The best way to build your own UDL file is to fork this repo. You need to install Node.js in your system.

```cmd
:: In your dev folder
git clone https://github.com/Edditoria/markdown-plus-plus.git
cd markdown-plus-plus
npm install

:: Play around. Finally, run the build script
npm run build
```

For details, please read the document: [build-workflow.md](docs/build-workflow.md)

## Options

Options are reviewed in v3. In **each** config file in the config folder, you can find these options:

| Option | Descriptions |
| ------ | ------------ |
| `goodies.hex` | Highlight HEX value. |
| `flags.transparentBg` | Make the text background being transparent. :warning: **Use it with caution** |
| `flags.asteriskUnorderedList` | Enable the markdown style of asterisk-style bullet points (`* a \<li\> bullet point`). :warning: **Use it with caution** |

For details, please read the document: [build-workflow.md](docs/build-workflow.md)

## Contribution

*tl;tr* For pull request, please do check **Allow edits from maintainers**, and merge from **your new branch** into **my master branch**; Or, propose a file change in Github directly; Or, hit me a message via issue page or my social contacts.

For details, please kindly read [CONTRIBUTING.md](CONTRIBUTING.md).

:beer: Thank you so much! :pray:

## Copyright and License

Copyright for portions of [this repository][this_repo] are held by Thomas Smits, 2010 as part of [his repository][thomsmits_npp]. All other copyright are held by Edditoria, 2012-2020.

Code released under the [MIT License](LICENSE.txt). Docs released under [Creative Commons](https://creativecommons.org/licenses/by/4.0/).

As human-readable summary (but not a substitute for the license):

You can use it, share it, modify the codes and distribute your work for private and commercial uses. If you like, please share your work with me. :pizza:


[screen_default]: docs/images/themes/default-screenshot.png "Markdown in Default Theme of Notepad++"
[screen_zenburn]: docs/images/themes/zenburn-screenshot.png "Markdown in Zenburn Theme of Notepad++"
[screen_bespin]: docs/images/themes/bespin-screenshot.png "Markdown in Bespin Theme of Notepad++"
[screen_blackboard]: docs/images/themes/blackboard-screenshot.png "Markdown in Blackboard Theme of Notepad++"
[screen_deep_black]: docs/images/themes/deep-black-screenshot.png "Markdown in Deep Black Theme of Notepad++"
[screen_obsidian]: docs/images/themes/obsidian-screenshot.png "Markdown in Obsidian Theme of Notepad++"
[screen_solarized]: docs/images/themes/solarized-screenshot.png "Markdown in Solarized Theme of Notepad++"
[screen_solarized_light]: docs/images/themes/solarized-light-screenshot.png "Markdown in Solarized-light Theme of Notepad++"

[this_repo]: https://github.com/Edditoria/markdown-plus-plus
[latest_release]: https://github.com/Edditoria/markdown-plus-plus/releases/latest
[coffeescript]: https://github.com/Edditoria/coffeescript_npp_zenburn
[thomsmits]: https://github.com/thomsmits/markdown_npp
[thomsmits_npp]: https://github.com/thomsmits/markdown_npp
[test_classic_file]: https://raw.githubusercontent.com/Edditoria/markdown-plus-plus/master/test/test.classic.md
