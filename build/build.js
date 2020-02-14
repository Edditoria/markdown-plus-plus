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

/* @type { string } - Default template file with path */
var templateFile = './build/template.hbs.xml';

/* @function template - Create a hbs template function. Requires templateFile to run. */
var template = Handlebars.compile(
	// Read template file synchronously
	// Making it a string is required by Handlebars
	fs.readFileSync(templateFile).toString()
);

/**
 * Render Handlebars template in Node 4 or above. Requires template() to run
 * @param {Object} files
 * @param {string} files.data - Full path for fs.readfile to read a config file
 * @param {string} files.output - Full path for fs.writeFile to write a udl.xml file
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
 * Create a Files object
 * @param {string} themeName
 * @return {Object} - Paths of Handlebars data source and expected output
 */
var createFilesObj = function (themeName) {
	return {
		data: './config/markdown.' + themeName + '.config.json',
		output: './udl/markdown.' + themeName + '.udl.xml'
	};
};

render(createFilesObj('default'));
