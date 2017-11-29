# Build Script for Developers

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


[build_screen_1]: images/markdown-plus-plus-build-screenshot-1.png "A Build Script To Help You Build Color Scheme"
[build_screen_2]: images/markdown-plus-plus-build-screenshot-2.png "Build script demo step 2"
[build_screen_3]: images/markdown-plus-plus-build-screenshot-3.png "Build script demo step 3"
[build_screen_4]: images/markdown-plus-plus-build-screenshot-4.png "Build script demo step 4"
