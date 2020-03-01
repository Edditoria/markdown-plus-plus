#!/usr/bin/env node

/**
 * Markdown-plus-plus is a project of markdown syntax highlighting for Notepad++, by customized UDL file (user defined language).
 * This project is open source on:
 * [Source]{@link https://github.com/Edditoria/markdown-plus-plus}.
 * Code released under the MIT license:
 * [License]{@link https://github.com/Edditoria/validid/blob/master/LICENSE.txt}.
 *
 * @file Build UML XML file(s) in current working directory.
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
	'Build UML XML file(s) for Notepad++ in current working directory.',
	'',
	'Usage: npx markdown-plus-plus [theme-name...] [--all] [-f | --force]',
	'',
	'Options:',
	'theme-name       Build UDL file(s) for specified theme(s)',
	'                 You can give multiple theme names',
	'                 e.g. npx markdown-plus-plus solarized zenburn deep-black',
	'-f, --force      Force to overwrite any file that already exists in directory',
	'-l, --list       List bundled themes in this package',
	'-v, --version    Print current version of this package',
	'-h, --help       Print usage',
	'',
	'Examples:',
	'npx markdown-plus-plus               Build all UDL files without overwrite',
	'npx markdown-plus-plus zenburn       Build Zenburn UDL file without overwrite',
	'npx markdown-plus-plus zenburn -f    Build Zenburn UDL file and overwrite',
	''
];

/* @type {string} - Version of this npm package. */
var version = process.env.npm_package_version;
/* @type {Array<string>} - Arguments from node. */
var args = process.argv.slice(2);
/* @type {string} - Current working directory. */
var cwd = process.cwd();
/* @type {string} - Root directory of this NPM package. */
var packagePath = path.resolve(__dirname, '../');
/* @type {string} - Path for <udl/> in this package. */
var udlPath = packagePath + '/udl';

/*
 * Parse arguments passed from user command input.
 * "-f" can only be passed at first or last argument.
 * "-l/-h/-v" can only be passed at first argument.
 * @param {Array<string>} args - Arguments from Node's `process.argv.slice(2)`.
 * @param {Array<string>} buildinThemes - Basically the theme names in <config/>.
 * @return {Object} - The parsed object passing to build steps.
 */
var parseArgs = function(args, buildinThemes) {
	var options = {
		themeNames: [],
		shouldContinue: false,
		isForce: false
	};
	// Parse the first argument. Quit asap if user put a proper flag.
	var firstArg = args[0];
	switch (firstArg) {
		case '-l': case '--list':
			console.log(buildinThemes.join('\n'));
			return options;
		case '-v': case '--version':
			console.log(version);
			return options;
		case '-h': case '--help':
			console.log(usageMsg.join('\n'));
			return options;
	}
	// Loop all arguments. Match the theme names, otherwise the program should quits.
	var arg;
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
		} else if (buildinThemes.indexOf(arg) >= 0) {
			options.themeNames.push(arg);
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
 * @return {string[]} - An array as a list of filenames.
 */
var getFileList = function(dir) {
	return fs.readdirSync(dir);
};

/**
 * Get theme name from a UDL XML filename, assuming the filename is in proper format.
 * @param {string} filename - Expected format: 'markdown.hyphen-lowercase-theme-name.udl.xml'.
 * @return {string}
 */
var getThemeName = function(filename) {
	var reHead = /^(markdown\.)/;
	var reTail = /(\.udl\.xml)$/;
	return filename.replace(reHead, '').replace(reTail, '');
};

/**
 * Get a list of theme names in a directory.
 * Theme names are stripped from filename of the built-in UDL files in <udl/>.
 * @param {Array<string>} - A list of theme names, e.g. ['default', 'zenburn'].
 */
var getThemeList = function(dir) {
	var files = getFileList(dir);
	var themeList = [];
	for (var i = 0; i < files.length; i++) {
		themeList.push(getThemeName(files[i]));
	}
	return themeList;
};

/**
 * Copy file from source to destination using `fs.createReadSteam()`.
 * This function will overwritten any files that already exists.
 * This function is created because `fs.copyFile()` requires Node v8.5+.
 * This NPM package targets to serve under Node v4+.
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
 * Build UDL XML file(s) in current working directory.
 * @param {Array} args - This array is produced by Node's `process.argv`.
 */
var main = function(args) {
	/* @type {string[]} - A list of filenames in <udl/> in this package. */
	var fileList = getFileList(packagePath + '/udl');
	// Loop the file list.
	var filename, src, dest, themeName, isExist;
	for (var i = 0; i < fileList.length; i++) {
		filename = fileList[i];
		src = packagePath + '/udl/' + filename;
		dest = cwd + '/' + filename;
		themeName = getThemeName(filename);
		// Synchronously check whether file exists.
		isExist = fs.existsSync(dest);
		// Jump to next iteration if file already exists.
		if (isExist) {
			console.log('[' + themeName + '] Warning: File already exists. Have skipped this one.');
			continue; // Jump to next iteration.
		}
		copyFile(src, dest);
		console.log('[' + themeName + '] Done: UDL file is created');
	}
};

/* @type {Array} - A list of theme names found in <udl/>. */
var buildinThemes = getThemeList(udlPath);
/* @type {Object} - Parse args into options object. */
var options = parseArgs(args, buildinThemes);
console.log(options);
// main(options);
