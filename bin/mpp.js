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

/* @type {Array<string>} - Arguments from node. */
var args = process.argv.slice(2);
/* @type {string} - Current working directory. */
var cwd = process.cwd();
/* @type {string} - Root directory of this NPM package. */
var packagePath = path.resolve(__dirname, '../');

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

main(args);
