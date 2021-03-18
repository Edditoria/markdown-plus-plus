# Build Workflow for Markdown-plus-plus

In v3, this repo is maintained as a npm package ([What is npm?][what_is_npm]). It mainly utilize Node API `fs` to read/write files, and easy-to-use template engine [Handlebars.js][handlebars] (Enhanced version of [Mustache.js][mustache]).

This document focus on the build workflow. In addition, you will understand more about the configs available for this package.

## Prepare for Your Environment

1. Make sure Notepad++, Git and Node.js are available in your machine. Open command prompt (`cmd.exe`) in Windows, then run:

	```cmd
	git --version
	node -v
	```

	![Build script screenshot 1: Check system environment][build_screen_1]

	If it cannot return version numbers, install the missing package:

	- [Node.js Windows Installer (.msi)][download_node]. Recommend 64-bit latest LTS version.
	- [Git for Windows][download_git].
	- If you want a GUI application for Git, I recommend [Fork Git client][fork_website].

1. Fork this repo:

	![Build script screenshot 2: Fork this repository][build_screen_2]

1. Clone and install markdown-plus-plus:

	```cmd
	:: Go to your development directory, example:
	cd %UserProfile%\dev

	:: Clone to your local machine
	:: Replace my username with yours
	git clone https://github.com/Edditoria/markdown-plus-plus.git

	:: Install dependencies in your project directory
	cd markdown-plus-plus
	npm install
	```

	![Build script screenshot 3: Results of git-clone and npm-install][build_screen_3]

You only need to run the above commands once.

## Understand The Build Scripts

In simple words, the `<build\build.js>` does the following things:

- Reads the config files in `<config\>` folder,
- use Handlebars.js library to render `<build\template.hbs.xml>` file, then
- writes UDL files in `<udl\>` folder.

Importantly, naming conversion follows the below rules:

- Config files are named `<markdown.[theme-name].config.json>`.
- UDL (output) files are named `<markdown.[theme-name].udl.xml>`. They are generated automatically.
- For theme name, I recommend naming it in lower-case English or number characters, and separating the words by hyphen. Optionally, you also can add more information for your needs, for example, `<markdown.magic-theme_by-your-name_v3.1.config.json>`.

![Build script screenshot 4: Understand the file structure in Notepad\+\+][build_screen_4]

**In most situations, you only need to edit the config files in `<config\>`.** You don't need to dig deep in build scripts, unless you want to change the build process, or fix things.

## Understand the Config and Options

To change highlighting behaviors, you need to edit the config files.

Open `<*.config.json>` file(s) in `<config\>` folder using Notepad++. As you see, the context in the file has to be valid json data.

| Option | Descriptions |
| ------ | ------------ |
| `themeName` | The theme name that will be displayed in Notepad++ menu under "Language". |
| `gfm.table` | HTML table in GitHub Flavored Markdown. This is what you see in this table. |
| `goodies.highlightHex` | Highlight HEX value. It is not a Markdown syntax but eye candy. |
| `goodies.extraProtocols` | A string to list extra protocols seperating by comma. |
| `flags.transparentBg` | By default, each text has background color set in `default.bgColor`. You can take out the background color by switching this option to `true`. However, some text or style may not display clearly on your screen. :warning: **Use it with caution** |
| `flags.asteriskUnorderedList` | By default, you cannot use asterisk-style bullet points (`* a \<li\> bullet point`). By switching this option to `true`, you can write in this markdown style. However, there will be a side effect: `*multiple em words*` will only parse the first word because it will screw up unordered list in some situations. :warning: **Use it with caution** |
| (Others) | All of them are [standard markdown][fireball_markdown_website] syntax suggested by Daring Fireball. |

## Finally || Anytime You Feel Good

Run the build script when you want some outputs:

```cmd
:: Build UDLs in <udl\>
npm run build
```

Remember to include the word "run"! `npm build` is totally different thing in npm.

![Build script screenshot 5: Results of running npm run build][build_screen_5]

Now, the UDL files are ready for you to import to Notepad++. Congratulation! :tada: :tada:

```cmd
:: Copy file(s) to serve Notepad++ (May vary to your system environment)
set npp_udl=%AppData%\Notepad++\userDefineLangs
dir udl /w
copy udl\markdown.zenburn.udl.xml %npp_udl%
```

![Build script screenshot 6: Copy UDL file to serve Notepad\+\+][build_screen_6]

## Other Notable Commands

```
:: See the difference of a file, e.g. an output file after build
git diff udl\markdown.zenburn.udl.xml

:: Discard all changes to latest commit
git checkout -- .

:: Make sure you are pushing/pulling the correct remote
git remote -v
```

Experience and enjoy. Happy coding! :pizza:

[what_is_npm]: https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/
[handlebars]: https://handlebarsjs.com
[mustache]: https://mustache.github.io
[download_node]: https://nodejs.org/en/download/
[download_git]: https://git-scm.com/downloads
[fork_website]: https://git-fork.com
[fireball_markdown_website]: https://daringfireball.net/projects/markdown/

[build_screen_1]: images/build/screenshot-1.png
[build_screen_2]: images/build/screenshot-2.png
[build_screen_3]: images/build/screenshot-3.png
[build_screen_4]: images/build/screenshot-4.png
[build_screen_5]: images/build/screenshot-5.png
[build_screen_6]: images/build/screenshot-6.png
