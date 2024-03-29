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
 * @param {boolean} isDark - `true` to create filename for dark mode.
 * @return {string} - E.g. 'markdown.theme-name.udl.xml'.
 */
var createUdlFilename = function(themeName, isDark) {
	var suffix = isDark === true ? '.dark.udl.xml' : '.udl.xml';
	return 'markdown.' + themeName + suffix;
};

/**
 * An object contains information for Handlebars {@link render}-ing.
 * @typedef {Object} RenderRequest
 * @property {string} config - Full path of config file.
 * @property {string} udl - Full path of expected UDL file in light mode.
 * @property {string} udlDark - Full path of expected UDL file in dark mode.
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
			udlFilename = createUdlFilename(themeName, false);
			udlFilenameDark = createUdlFilename(themeName, true);
			// Create a {@link RenderRequest} object and append to the array.
			renderRequestList.push({
				config: paths.config + '/' + filename,
				udl: paths.udl + '/' + udlFilename,
				udlDark: paths.udl + '/' + udlFilenameDark,
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
};

/**
 * Create theme name in UDL file accroding to light mode or dark mode.
 * @param {Object} options - The options object by Handlebars block helper.
 * @return {string} - 'Markdown (Theme Name)' for light mode; 'Markdown [Theme Name]' for dark mode.
 */
var createUdlName = function(options) {
	var data = Handlebars.createFrame(options.data.root);
	var suffix = data.darkMode === true ? '[' + data.themeName + ']' : '(' + data.themeName + ')';
	return 'Markdown ' + suffix;
};

Handlebars.registerHelper('parseExtraProtocols', parseExtraProtocols);
Handlebars.registerHelper('createUdlName', createUdlName);

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
 * Do fs.writeFile().
 * @param {RenderRequest} renderRequest
 * @param {string} outputLight - Output (light mode) from Handlebars.compile().
 * @param {string} outputDark - Output (dark mode) from Handlebars.compile().
 * @throws Error in saving UDL file.
 */
var writeUDLFiles = function(renderRequest, outputLight, outputDark) {
	fs.writeFile(renderRequest.udl, outputLight, function(writeError) {
		if (writeError) {
			console.log('[' + renderRequest.themeName + '] Error in saving UDL file');
			throw writeError;
		}
		fs.writeFile(renderRequest.udlDark, outputDark, function(writeError) {
			if (writeError) {
				console.log('[' + renderRequest.themeName + '] Error in saving UDL file');
				throw writeError;
			}
			console.log('[' + renderRequest.themeName + '] UDL files are created successfully');
		});
	});
};

/**
 * Render and write all files using Handlebars template, including light and dark mode.
 * @param {RenderRequest} renderRequest
 * @param {Object} template - The template as a function passed by {@link createTemplate}.
 */
var render = function(renderRequest, template) {
	/* Read one config file asynchronously. */
	fs.readFile(renderRequest.config, 'utf8', function(dataError, dataStr) {
		if (!dataError) {
			/** JSON object based on config file. */
			var data = JSON.parse(dataStr);
			data.darkMode = false;
			var outputLight = template(data);
			data.darkMode = true;
			var outputDark = template(data);
			/** Write UDL XML files asynchronously. */
			writeUDLFiles(renderRequest, outputLight, outputDark);
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
