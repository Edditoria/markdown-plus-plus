#!/usr/bin/env node

/**
 * Markdown-plus-plus is a project of markdown syntax highlighting for Notepad++, by customized UDL file (user defined language).
 * This project is open source on:
 * [Source]{@link https://github.com/Edditoria/markdown-plus-plus}.
 * Code released under the MIT license:
 * [License]{@link https://github.com/Edditoria/validid/blob/master/LICENSE.txt}.
 *
 * @file Fetch UML XML file(s) for Notepad++ in current working directory.
 * @auther Edditoria
 * @license MIT
 */

var fs = require('fs');
var path = require('path');

/*
Expected usage:
```cmd
npx markdown-plus-plus [options]    # In UDL folder of Notepad++
mpp [options]                       # After install this package globally
npm run mpp -- [options]            # Develop in package directory
````
*/
/* @type {Array<string>} - Usage messages to print */
var usageMsg = [
	'Fetch UML XML file(s) for Notepad++ in current working directory.',
	'',
	'Usage: npx markdown-plus-plus [theme-name...] [-f | --force]',
	'',
	'Options:',
	'theme-name       Fetch UDL file(s) for specified theme(s)',
	'                 You can give multiple theme names',
	'                 e.g. npx markdown-plus-plus solarized zenburn deep-black',
	'-f, --force      Force to overwrite any file that already exists in directory',
	'-l, --list       List bundled themes in this package',
	'-v, --version    Print current version of this package',
	'-h, --help       Print usage',
	'',
	'Examples:',
	'npx markdown-plus-plus               Fetch all UDL files without overwrite',
	'npx markdown-plus-plus zenburn       Fetch Zenburn UDL file without overwrite',
	'npx markdown-plus-plus zenburn -f    Fetch Zenburn UDL file and overwrite',
	''
];

/* @type {string} - Version of this npm package. */
var version = process.env.npm_package_version;
/* @type {Array<string>} - Arguments from node. */
var args = process.argv.slice(2);
/* @type {string} - Current working directory. */
var cwd = process.cwd();
/* @type {string} - Root directory of this npm package. */
var packagePath = path.resolve(__dirname, '../');
/* @type {string} - Path for <udl/> in this package. */
var udlPath = packagePath + '/udl';

/**
 * Parse arguments passed from user command input.
 * "-f" can only be passed at first or last argument.
 * "-l/-h/-v" can only be passed at first argument.
 * @param {Array<string>} args - Arguments from Node's `process.argv.slice(2)`.
 * @param {bundledUdls} bundledUdls - Basically the theme names and filenames in <udl/>.
 * @return {Object} - The parsed object passing to fetch steps.
 */
var parseArgs = function(args, bundledUdls) {
	var options = {
		themeList: [],
		fileList: [],
		shouldContinue: false,
		isForce: false
	};
	// Parse the first argument. Quit asap if user put a proper flag.
	var firstArg = args[0];
	switch (firstArg) {
		case '-l': case '--list':
			console.log(bundledUdls.themeList.join('\n'));
			return options;
		case '-v': case '--version':
			console.log(version);
			return options;
		case '-h': case '--help':
			console.log(usageMsg.join('\n'));
			return options;
	}
	// Loop all arguments. Match the theme names, otherwise the program should quits.
	var arg, indexOfTheme;
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
		} else if (bundledUdls.themeList.indexOf(arg) >= 0) {
			options.themeList.push(arg);
			indexOfTheme = bundledUdls.themeList.indexOf(arg);
			options.fileList.push(bundledUdls.fileList[indexOfTheme]);
		} else {
			console.log('arg[' + i + ']: ' + 'Unsupported option \"' + arg + '\" or combination of options.');
			return options;
		}
	}
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
 * @return {string} - Usually 'hyphen-lowercase-theme-name'.
 */
var getThemeName = function(filename) {
	var reHead = /^(markdown\.)/;
	var reTail = /(\.udl\.xml)$/;
	return filename.replace(reHead, '').replace(reTail, '');
};

/**
 * @typedef {Object} BundledUdls
 * @description An object that contains a list of theme names and a list of their filenames.
 * @property {Array<string>} themeList - A list of theme names corresponding to the file list.
 * @property {Array<string>} fileList - A list of filenames in <udl/> of this package.
 */
/**
 * Create a special object that contains information of files in <udl/>.
 * This approach could avoid some wired theme names, e.g. '__proto__'
 * @param {udlPath} - The path of <udl/>.
 * @return {BundledUdls}
 */
var createBundledUdls = function(udlPath) {
	var fileList = getFileList(udlPath);
	var themeList = [];
	var filename, themeName;
	for (var i = 0; i < fileList.length; i++) {
		filename = fileList[i];
		themeName = getThemeName(filename);
		themeList.push(themeName);
	}
	return { themeList: themeList, fileList: fileList };
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
 * @param {BundledUdls} - Will use it when need to fetch all bundled UDL files.
 */
var main = function(options, bundledUdls) {
	var isForce = options.isForce;
	var isFetchAll = options.themeList.length === 0;
	var themeList = isFetchAll ? bundledUdls.themeList : options.themeList;
	var fileList = isFetchAll ? bundledUdls.fileList : options.fileList;
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

/* @type {BundledUdls} - Create a special object that contains theme list and file list. */
var bundledUdls = createBundledUdls(udlPath);
/* @type {Object} - Parse args into options object. */
var options = parseArgs(args, bundledUdls);
if (options.shouldContinue) {
	main(options, bundledUdls);
}
