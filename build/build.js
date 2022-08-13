/**
 * Markdown-plus-plus is a project of markdown syntax highlighting for Notepad++, by customized UDL file (user defined language).
 * This project is open source on:
 * [Source]{@link https://github.com/Edditoria/markdown-plus-plus}.
 * Code released under the MIT license:
 * [License]{@link https://github.com/Edditoria/validid/blob/master/LICENSE.txt}.
 *
 * @file Build UDL files in <udl/> using config files in <config/>.
 * @auther Edditoria
 * @license MIT
 */

/***/
var fs = require('fs');
var Handlebars = require('handlebars');
var path = require('path');

var packagePath = path.resolve(__dirname, '../');

/**
 * Collection of paths for this npm package.
 * @typedef {Object} Paths
 * @property {string} package - Root directory of this npm package.
 * @property {string} config - Directory for config files.
 * @property {string} udl - Directory for expected UDL XML files.
 * @property {string} template - File path of Handlebars template.
 */
/** @type {Paths} */
var paths = {
	package: packagePath,
	config: packagePath + '/config',
	udl: packagePath + '/udl',
	template: packagePath + '/build/template.hbs.xml'
};


/*
 * File Operations
 * ===============
 */

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
 * Check whether a config filename is in proper format.
 * @param {string} filename - Expected format: 'markdown.theme-name.config.json'.
 * @return {boolean}
 */
var isItThemeNameFormat = function(filename) {
	return /^(markdown\.)\S+(\.config\.json)$/.test(filename);
};

/**
 * Get theme name from a config filename, assuming the filename is in proper format.
 * @param {string} filename - Expected format: 'markdown.hyphen-lowercase-theme-name.config.json'.
 * @return {string}
 */
var getThemeName = function(filename) {
	var reHead = /^(markdown\.)/;
	var reTail = /(\.config\.json)$/;
	return filename.replace(reHead, '').replace(reTail, '');
};

/**
 * Create filename of a UDL file base on a theme name.
 * @param {string} themeName - Expected format: 'hyphen-lowercase-theme-name'.
 * @return {string} - E.g. 'markdown.theme-name.udl.xml'.
 */
var createUdlFilename = function(themeName) {
	return 'markdown.' + themeName + '.udl.xml';
};

/**
 * An object contains information for Handlebars {@link render}-ing.
 * @typedef {Object} RenderRequest
 * @property {string} config - Full path of config file.
 * @property {string} udl - Full path of expected UDL file.
 * @property {string} themeName - In format of dash-lower-case-theme-name.
 */
/**
 * Create a list of {@link RenderRequest} according to the files in config directory.
 * @param {sting} configPath - Path of config directory.
 * @return {RenderRequest[]} - A list of {@link RenderRequest} for Handlebars {@link render}-ing.
 */
var createRenderRequestList = function(configPath) {
	/** @type {string[]} Create an array of config files (Default in <config/>). */
	var configFileList = getFileList(configPath);
	var renderRequestList = [];
	var filename, themeName, udlFilename;
	// Loop the config files
	for (var i = 0; i < configFileList.length; i++) {
		filename = configFileList[i];
		// Expect all filenames are in format of 'markdown.[theme-name].config.json'.
		if (!!isItThemeNameFormat(filename)) {
			themeName = getThemeName(filename);
			udlFilename = createUdlFilename(themeName);
			// Create a {@link RenderRequest} object and append to the array.
			renderRequestList.push({
				config: paths.config + '/' + filename,
				udl: paths.udl + '/' + udlFilename,
				themeName: themeName
			});
		} else {
			// Important: Should not write any file into the file system.
			var configError = 'One or more config file(s) does not named correctly. Expected pattern: markdown.[theme-name].config.json';
			throw new Error(configError);
		}
	}
	return renderRequestList;
};


/*
 * Handlebars Rendering
 * ====================
 */

/**
 * Parse input to protocols being used in UDL.
 * @param {string|string[]} input
 * @return {string}
 */
var parseExtraProtocols = function(input) {
	if (typeof input === 'undefined' || input === '' || input === null) {
		return '';
	}
	// Break into an array
	if (typeof input === 'string') {
		input = input.split(',');
	}
	// For each item, trim whitespace,
	//    then parse to two formats.
	var output = [];
	var item;
	for (var i = 0, l = input.length; i < l; i++) {
		item = input[i].replace(/^\s+|\s+$/g, '');
		output.push(item);
		output.push('(' + item);
	}
	return output.join(' ') + ' ';
}
Handlebars.registerHelper('parseExtraProtocols', parseExtraProtocols);

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
 * Render and write all files using Handlebars template.
 * @param {RenderRequest} renderRequest
 * @param {template} - The template as a function passed by {@link createTemplate}.
 */
var render = function(renderRequest, template) {
	/* @function readFile - Read the config file asynchronously. */
	fs.readFile(renderRequest.config, 'utf8', function(dataError, data) {
		if (!dataError) {
			var dataObj = JSON.parse(data);
			var output = template(dataObj);
			/* @function writeFile - Write the file asynchronously. */
			fs.writeFile(renderRequest.udl, output, function(writeError) {
				if (!writeError) {
					console.log('[' + renderRequest.themeName + '] UDL file is created successfully');
				} else {
					console.log('[' + renderRequest.themeName + '] Error in saving UDL file');
					throw writeError;
				}
			});
		} else {
			console.log('[' + renderRequest.themeName + '] Error in loading config data');
			throw dataError;
		}
	});
};


/*
 * Main Operations
 * ===============
 */

/**
 * Build the UDL XML files according to the config files using Handlebars rendering.
 * @param {RenderRequest[]} renderRequestList
 * @param {string} templatePath - Full path of the template file in Handlebars format.
 */
var main = function(renderRequestList, templatePath) {
	/* @function template - Create a template function required by Handlebars. */
	var template = createTemplate(templatePath);
	/* Put the {@link RenderRequest} objects to {@link render} using the {@link template} above. */
	for (var i = 0; i < renderRequestList.length; i++) {
		// Render the files asynchronously.
		render(renderRequestList[i], template);
	}
};
// module.exports = function(renderRequestList, templatePath) {}; //todo

var renderRequestList = createRenderRequestList(paths.config);
main(renderRequestList, paths.template);
