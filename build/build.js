/**
 * Markdown-plus-plus is a project of markdown syntax highlighting for Notepad++, by customized UDL file (user defined language).
 * This project is open source on:
 * [Source]{@link https://github.com/Edditoria/markdown-plus-plus}.
 * Code released under the MIT license:
 * [License]{@link https://github.com/Edditoria/validid/blob/master/LICENSE.txt}
 *
 * @file Build script for markdown-plus-plus.
 * @auther Edditoria
 * @license MIT
 */

var fs = require('fs');
var Handlebars = require('handlebars');
var path = require('path');

var packagePath = path.resolve(__dirname, '../');

/**
 * @typedef {Object} Paths
 * @description Collection of paths for this npm package.
 * @property {string} package - Root directory of this npm package.
 * @property {string} config - Directory for config files.
 * @property {string} udl - Directory for expected UDL XML files.
 * @property {string} template - File path of Handlebars template.
 */
/** @type {Paths} paths */
var paths = {
	package: packagePath,
	config: packagePath + '/config',
	udl: packagePath + '/udl',
	template: packagePath + '/build/template.hbs.xml'
};

/**
 * Create a function of Handlebars template.
 * @param {string} templatePath - Full path of template file.
 * @return {Object} - A function of Handlebars template.
 */
var createTemplate = function(templatePath) {
	return Handlebars.compile(
		// Read template file synchronously.
		// Making it a string is required by Handlebars.
		fs.readFileSync(templatePath).toString()
	);
};

/**
 * @typedef {Object} Files
 * @description Full paths of config data, expected output UDL files and etc.
 * @property {string} config - Full path of config file
 * @property {string} udl - Full path of expected UDL file
 * @property {string} themeName - In format of dash-lower-case-theme-name
 */
/**
 * Render and write all files using Handlebars template.
 * @param {Files} files - The {@link Files} object for Handlebars rendering.
 */
var render = function(files, template) {
	/* @function readFile - Read the config file asynchronously */
	fs.readFile(files.config, 'utf8', function(dataError, data) {
		if (!dataError) {
			var dataObj = JSON.parse(data);
			var output = template(dataObj);
			/* @function writeFile - Write the file asynchronously */
			fs.writeFile(files.udl, output, function(writeError) {
				if (!writeError) {
					console.log('[' + files.themeName + '] UDL file is created successfully');
				} else {
					console.log('[' + files.themeName + '] Error in saving UDL file');
					throw writeError;
				}
			});
		} else {
			console.log('[' + files.themeName + '] Error in loading config data');
			throw dataError;
		}
	});
};

/**
 * Create a Files object in format of {@link Files}
 * @param {string} themeName - In format of dash-lower-case-theme-name
 * @param {Paths} paths - The {@link Paths} object for Handlebars rendering
 * @return {Files}
 */
var createFilesObj = function(themeName, paths) {
	return {
		config: paths.config + '/markdown.' + themeName + '.config.json',
		udl: paths.udl + '/markdown.' + themeName + '.udl.xml',
		themeName: themeName
	};
};

var template = createTemplate(paths.template);
var defaultFiles = createFilesObj('default', paths);
render(defaultFiles, template);
