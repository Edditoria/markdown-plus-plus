/**
 * Markdown-plus-plus is a project of markdown syntax highlighting for Notepad++, by customized UDL file (user defined language)
 * @file Build script for markdown-plus-plus
 * @auther Edditoria
 * @license MIT
 * Code released under the MIT license:
 * https://github.com/Edditoria/validid/blob/master/LICENSE.txt
 */

var fs = require('fs');
var Handlebars = require('handlebars');
var path = require('path');

/**
 * @typedef {Object} Paths
 * @description Collection of paths for this npm package
 * @property {string} package - Root directory of this npm package
 * @property {string} template - File path of Handlebars template
 */
/** @type {Paths} paths */
var paths = {
	package: path.resolve(__dirname, '../'),
	template: path.resolve(__dirname, 'template.hbs.xml')
};

/**
 * Create a function of Handlebars-template. Requires paths object to run.
 * @function template
 */
var template = Handlebars.compile(
	// Read template file synchronously
	// Making it a string is required by Handlebars
	fs.readFileSync(paths.template).toString()
);

/**
 * Render Handlebars template in Node 4 or above. Requires template() to run
 * @param {Files} files - The {@link Files} object for Handlebars rendering
 */
var render = function (files) {
	/* @function readFile - Read the config file asynchronously */
	fs.readFile(files.data, 'utf8', function(dataError, data) {
		if (!dataError) {
			var dataObj = JSON.parse(data);
			var output = template(dataObj);
			/* @function writeFile - Write the file asynchronously */
			fs.writeFile(files.output, output, function(writeError) {
				if (!writeError) {
					console.log('Write file successfully');
				} else {
					console.log('[fs.writeFile] Error in saving file');
					throw writeError;
				}
			});
		} else {
			console.log('[fs.readFile] Error in loading template');
			throw dataError;
		}
	});
};

/**
 * @typedef {Object} Files
 * @description Full paths of config data, expected output UDL files and etc.
 * @property {string} data - Full path of config data
 * @property {string} output - Full path of expected UDL file
 */
/**
 * Create a Files object in format of {@link Files}
 * @param {string} themeName - In format of dash-lower-case-theme-name
 * @param {Paths} paths - The {@link Paths} object for Handlebars rendering
 * @return {Files}
 */
var createFilesObj = function (themeName, paths) {
	return {
		data: paths.package + '/config/markdown.' + themeName + '.config.json',
		output: paths.package + '/udl/markdown.' + themeName + '.udl.xml'
	};
};

render(createFilesObj('default', paths));
