#!/usr/bin/env node

/**
 * Markdown-plus-plus is a project of markdown syntax highlighting for Notepad++, by customized UDL file (user defined language).
 * This project is open source on:
 * [Source]{@link https://github.com/Edditoria/markdown-plus-plus}.
 * Code released under the MIT license:
 * [License]{@link https://github.com/Edditoria/validid/blob/master/LICENSE.txt}.
 *
 * @file Fetch UDL XML file(s) for Notepad++ in current working directory.
 * @auther Edditoria
 * @license MIT
 */

/***/
var fs = require('fs');
var path = require('path');
var packageJson = require('../package.json');

/*
Expected usage:
```cmd
npx markdown-plus-plus [options]    # In UDL folder of Notepad++
mpp [options]                       # After install this package globally
npm run mpp -- [options]            # Develop in package directory
````
*/

/**
 * An object that contains lists of theme names and their filenames, by light and dark mode.
 * @typedef {Object} BundledUdls
 * @property {Object} light
 * @property {Array<string>} light.themeList - A list of theme names corresponding to the file list.
 * @property {Array<string>} light.fileList - A list of filenames in <udl/> of this package.
 * @property {Object} dark
 * @property {Array<string>} dark.themeList - A list of theme names corresponding to the file list.
 * @property {Array<string>} dark.fileList - A list of filenames in <udl/> of this package.
 */

/**
 * Create usage message to print.
 * @param {BundledUdls} bundledUdls - The theme names and filenames in <udl/>.
 * @return {string} - The usage message with line breaks.
 */
var createUsageMsg = function(bundledUdls) {
	var themeList = joinWithLineBreak(bundledUdls.light.themeList, 5);
	var usageMsg = [
		'Fetch UDL XML file(s) for Notepad++ in current working directory.',
		'Tips: Run `mpp` command if you `npm install -g markdown-plus-plus`.',
		'',
		'Usage:',
		'  npx markdown-plus-plus [<theme-name>...] [--dark] [-f | --force]',
		'  npx markdown-plus-plus (-l|--list | -v|--version | -h|--help)',
		'',
		'Options:',
		'theme-name       Fetch UDL file(s) for specified theme(s).',
		'--dark           Fetch Dark Mode version.',
		'-f, --force      Force to overwrite file(s) that already exists.',
		'-l, --list       List bundled themes.',
		'-v, --version    Print current version.',
		'-h, --help       Print help.',
		'',
		'Available themes:',
		themeList,
		'',
		'Examples:',
		'npx markdown-plus-plus    Fetch all UDL files without overwrite.',
		'mpp solarized             Fetch Zenburn UDL file without overwrite.',
		'mpp solarized -f          Fetch Solarized UDL file and overwrite.',
		'mpp solarized --dark      Fetch Zenburn UDL file in Dark Mode.'
	];
	return usageMsg.join('\n');
};

/** @type {string} - Version of this npm package. */
var version = packageJson.version;
/** @type {Array<string>} - Arguments from node. */
var args = process.argv.slice(2);
/** @type {string} - Current working directory. */
var cwd = process.cwd();
/** @type {string} - Root directory of this npm package. */
var packagePath = path.resolve(__dirname, '../');
/** @type {string} - Path for <udl/> in this package. */
var udlPath = packagePath + '/udl';

/**
 * Utility function to join an array with line break per x items.
 * @param {Array<string>} input - A simple list of strings.
 * @param {number} numEachLine - Max number item per line.
 * @return {string} - e.g. 'some, items,\neach, line'.
 */
var joinWithLineBreak = function(input, numEachLine) {
	var output = '';
	var nextBreakIndex = numEachLine - 1;
	var len = input.length;
	var finalIndex = len - 1;
	for (var i = 0; i < len; i++) {
		if (i === finalIndex) {
			output += input[i];
		} else if (i === nextBreakIndex) {
			nextBreakIndex += numEachLine;
			output += input[i] + ',\n';
		} else {
			output += input[i] + ', ';
		}
	}
	return output;
};

/**
 * Parse arguments passed from user command input.
 * "-f" can only be passed at first or last argument.
 * "-l/-h/-v" can only be passed at first argument.
 * @param {Array<string>} args - Arguments from Node's `process.argv.slice(2)`.
 * @param {BundledUdls} bundledUdls - Basically the theme names and filenames in <udl/>.
 * @return {Object} - The parsed object passing to fetch steps.
 */
var parseArgs = function(args, bundledUdls) {
	var options = {
		themeList: [],
		fileList: [],
		shouldContinue: false,
		isForce: false,
		isDark: false
	};
	// Parse the first argument. Quit asap if user put a proper flag.
	var firstArg = args[0];
	switch (firstArg) {
		case '-l': case '--list':
			console.log(bundledUdls.light.themeList.join('\n'));
			return options;
		case '-v': case '--version':
			console.log(version);
			return options;
		case '-h': case '--help':
			console.log(createUsageMsg(bundledUdls));
			return options;
	}
	// Loop all arguments. Parse for switch(es) first.
	var arg, indexOfTheme;
	var otherArgs = [];
	for (var i = 0; i < args.length; i++) {
		arg = args[i];
		if (arg === '-f' || arg === '--force') {
			if (i === 0 || i === args.length - 1) {
				console.log('Warning! In force mode, any existing file(s) will be overwritten.\n');
				options.isForce = true;
			} else {
				console.log('arg[' + i + ']: You pass the \"' + arg + '\" flag in wrong position. Quit for safety.');
				return options;
			}
		} else if (arg === '--dark') {
			options.isDark = true;
		} else {
			otherArgs.push(arg);
		}
	}
	// Loop `otherArgs`. Match the theme names, otherwise the program should quit.
	var themeMode = options.isDark ? 'dark' : 'light';
	for (var i = 0; i < otherArgs.length; i++) {
		arg = otherArgs[i];
		if (bundledUdls[themeMode].themeList.indexOf(arg) >= 0) {
			options.themeList.push(arg);
			indexOfTheme = bundledUdls[themeMode].themeList.indexOf(arg);
			options.fileList.push(bundledUdls[themeMode].fileList[indexOfTheme]);
		} else {
			console.log('arg: ' + 'Unsupported option \"' + arg + '\" or combination of options.');
			return options;
		}
	}
	// Finally:
	options.shouldContinue = true;
	return options;
};

/**
 * Get file list in a directory.
 * Similar to `dir /w` in command prompt and `ls` in bash.
 * Expect program quit with error if it does not find the directory.
 * @param {string} dir - Path of a directory.
 * @return {Array<string>} - An array as a list of filenames.
 */
var getFileList = function(dir) {
	return fs.readdirSync(dir);
};

/**
 * Get theme name from a UDL XML filename, assuming the filename is in proper format.
 * @param {string} filename - Expected format: 'markdown.hyphen-lowercase-theme-name.udl.xml'.
 * @return {string} - Usually 'hyphen-lowercase-theme-name(.dark)'.
 */
var getThemeName = function(filename) {
	var reHead = /^(markdown\.)/;
	var reTail = /(\.udl\.xml)$/;
	return filename.replace(reHead, '').replace(reTail, '');
};

/**
 * Create a special object that contains information of files in <udl/>.
 * This approach could avoid some wired theme names, e.g. '__proto__'
 * @param {udlPath} - The path of <udl/>.
 * @return {BundledUdls}
 */
var createBundledUdls = function(udlPath) {
	var bundledFileList = getFileList(udlPath);
	/** @type {BundledUdls} */
	var output = {
		light: { themeList: [], fileList: [] },
		dark: { themeList: [], fileList: [] }
	};
	var filename, themeName;
	for (var i = 0; i < bundledFileList.length; i++) {
		filename = bundledFileList[i];
		themeName = getThemeName(filename);
		if (/\.dark$/.test(themeName)) {
			output.dark.themeList.push(themeName.replace(/(\.dark)$/, ''));
			output.dark.fileList.push(filename);
		} else {
			output.light.themeList.push(themeName);
			output.light.fileList.push(filename);
		}
	}
	return output;
};

/**
 * Copy file from source to destination using `fs.createReadSteam()`.
 * This function will overwritten any files that already exists.
 * This function is created because `fs.copyFile()` requires Node v8.5+.
 * This npm package targets to serve under Node v4+.
 * @param {string} src - Path of source directory.
 * @param {string} dest - Path of destination directory.
 */
var copyFile = function(src, dest) {
	var readSteam = fs.createReadStream(src);
	readSteam.once('error', function(error) {
		console.log(error);
	});
	// readSteam.once('end', function() {
	// 	console.log('copyFile() done');
	// });
	readSteam.pipe(fs.createWriteStream(dest));
};

/**
 * Fetch UDL XML file(s) in current working directory.
 * Normally the file list should be checked and they are available in <udl/>.
 * @param {Object} options - User options originally from command line.
 * @param {BundledUdls} bundledUdls - Will use it when need to fetch all bundled UDL files.
 */
var main = function(options, bundledUdls) {
	var isForce = options.isForce;
	var isFetchAll = options.themeList.length === 0;
	var themeMode = options.isDark ? 'dark' : 'light';
	var themeList = isFetchAll ? bundledUdls[themeMode].themeList : options.themeList;
	var fileList = isFetchAll ? bundledUdls[themeMode].fileList : options.fileList;
	// Loop the file list.
	var filename, src, dest, themeName, isExist;
	for (var i = 0; i < fileList.length; i++) {
		filename = fileList[i];
		src = packagePath + '/udl/' + filename;
		dest = cwd + '/' + filename;
		themeName = themeList[i];
		// Synchronously check whether file exists.
		isExist = fs.existsSync(dest);
		// Jump to next iteration if file already exists and not in force mode.
		if (isExist && !isForce) {
			console.log('[' + themeName + '] Warning: File already exists. Have skipped this one.');
			continue; // Jump to next iteration.
		}
		copyFile(src, dest);
		console.log('[' + themeName + '] Done: UDL file is created');
	}
};

/** @type {BundledUdls} - Create a special object that contains theme list and file list. */
var bundledUdls = createBundledUdls(udlPath);
/** @type {Object} - Parse args into options object. */
var options = parseArgs(args, bundledUdls);
if (options.shouldContinue) {
	main(options, bundledUdls);
}
