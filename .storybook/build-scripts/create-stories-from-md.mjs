import os from 'os';
import fs from 'fs';
import { pathToFileURL } from 'url';
import { dirname, resolve } from 'path';
import { performance } from 'perf_hooks';
import glob from 'glob';
import showdown from 'showdown';
import showdownHtmlEscape from 'showdown-htmlescape';

export function removeFolderSafely(outputFolder) {
	if (fs.existsSync(outputFolder)) {
		fs.rmdirSync(outputFolder, { recursive: true });
		return true;
	}
	return false;
}

export default build;

export {
	hrefLinkProcessing,
	relocateStaticResources,
}

const CONFIGS_LOOKUP_PATTERN = '+(common|components|docs)/**/stories/**/*.config.+(js|mjs)';
const DEFAULT_OUTPUT_FILE_SUFFIX = '.autogenerated.stories.js';

const FS_OPTIONS = { encoding: 'utf-8' };
const converter = new showdown.Converter({ extensions: [showdownHtmlEscape] });
converter.setFlavor('github');

async function build() {
	console.log(`${os.EOL}transforming MDs to stories...`);
	const startTime = performance.now();
	const configPaths = collectConfigurations();
	for (const configPath of configPaths) {
		await processJsConfiguration(configPath);
	}
	console.log(`... transformation of ${configPaths.length} MDs to stories DONE (${Math.round(performance.now() - startTime)}ms)${os.EOL}`);
}

function collectConfigurations() {
	console.info('collecting configurations...');
	const result = glob.sync(CONFIGS_LOOKUP_PATTERN);
	console.info(`... ${result.length} configuration/s collected`);
	return result;
}

async function processJsConfiguration(configPath) {
	console.info(`processing '${configPath}'...`);

	//	import config
	const importPath = pathToFileURL(resolve(configPath)).href;
	const config = (await import(importPath)).default;
	validateConfig(config);

	//	convert
	const configDir = dirname(configPath);
	let mdText = fs.readFileSync(resolve(configDir, config.sourcePath), FS_OPTIONS);
	if (config.mdPreProcess) {
		mdText = config.mdPreProcess(mdText);
	}
	let htmlText = converter.makeHtml(mdText);
	if (config.htmlPostProcess) {
		htmlText = config.htmlPostProcess(htmlText);
	}
	const htmlFinal = applyCommonTransformations(htmlText);
	const storyJs = buildStoryJs(config.story, htmlFinal);

	//	dump
	const outputFileName = config.outputName + (config.outputName.endsWith('.js')
		? ''
		: DEFAULT_OUTPUT_FILE_SUFFIX);
	fs.writeFileSync(resolve(configDir, outputFileName), storyJs, FS_OPTIONS);

	console.info('... done');
}

function validateConfig(config) {
	if (!config || typeof config !== 'object') {
		throw new Error(`config MUST be a non-null object; violator: ${config}`);
	}
	if (!config.sourcePath || typeof config.sourcePath !== 'string') {
		throw new Error(`'sourcePath' MUST be a non-empty string; got '${config.sourcePath}'`);
	}
	if (!config.outputName || typeof config.outputName !== 'string') {
		throw new Error(`'outputPath' MUST be a non-empty string; got '${config.outputName}'`);
	}
	if (!config.story || typeof config.story !== 'object') {
		throw new Error(`'story' MUST be a non-null object; got '${config.story}'`);
	}
	if (!config.story.title || typeof config.story.title !== 'string') {
		throw new Error(`'story.title' MUST be a non-empty string; got '${config.story.title}'`);
	}
	if (!config.story.name || typeof config.story.name !== 'string') {
		throw new Error(`'story.name' MUST be a non-empty string; got '${config.story.name}'`);
	}

	if ('mdPreProcess' in config && typeof config.mdPreProcess !== 'function') {
		throw new Error(`'mdPreProcess', when provided, MUST be a function; got '${config.mdPreProcess}'`);
	}
	if ('htmlPostProcess' in config && typeof config.htmlPostProcess !== 'function') {
		throw new Error(`'htmlPostProcess', when provided, MUST be a function; got '${config.htmlPostProcess}'`);
	}
}

function applyCommonTransformations(htmlInput) {
	return `
		<link rel="stylesheet" href="assets/css/md-stories.css">
		${htmlInput}
	`;
}

function buildStoryJs(story, html) {
	let result = `
	//	Autogenerated at ${new Date().toISOString()}
	//
	export default {
		title: '${story.title}'
	};

	export const ${story.name} = () => String.raw\`${
		html
			.replace(/([`$])/g, '` + "$1" + String.raw\`')
			.replace(/(\\+)`/g, '` + "$1$1"')
	}\`;
	`;


	if (story.parameters) {
		result += `
	${story.name}.parameters = ${JSON.stringify(story.parameters)};
		`;
	}

	return result;
}

//	static resouces relocation utility
const
	AUTOGENERATED_FOLDER_RELATIVE = 'assets/autogenerated',
	AUTOGENERATED_FOLDER_ABSOLUTE = `.storybook/static/${AUTOGENERATED_FOLDER_RELATIVE}`;
removeFolderSafely(AUTOGENERATED_FOLDER_ABSOLUTE);
fs.mkdirSync(AUTOGENERATED_FOLDER_ABSOLUTE, { recursive: true });

/**
 * helper method to update cross links from those used in MD to those, that will be relevant in StoryBook
 *
 * @param {string} input - the HTML body, that will be updated with the new links
 * @param {string[][]} replacePairs - array of replacement PAIRs, where each pair is array of 2 items: first is the exact reference found in MD, second is the new link to be put into the StoryBook instead of the first one
 * @returns {string} - post processed HTML body
 */
function hrefLinkProcessing(input, replacePairs) {
	let r = input;
	for (const [hrefToFind, hrefToPlace] of replacePairs) {
		r = r.replace(hrefToFind, `href="/${hrefToPlace}"`);
		//	r = r.replace(hrefToFind, `name onclick="window.location=window.location.href.replace(/[?].*$/, '${hrefToPlace}')"`);
	}
	return r;
}

/**
 * helper method to relocate static resources used in MD files (images) into the StoryBook's dedicated static folder
 * - this method copies the specified resources into temporary build folder
 * - this method updates an HTML result with the correct paths to reach the resource in StoryBook context
 *
 * @param {string} htmlInput - the HTML body, that will be updated with the correct static resources paths
 * @param {string[]} srPaths - an array of static resources' paths, EXACTLY as they are found in the original MD file
 * @param {string} srBasePath - optional base path, in case MD referred to the static resources by relative path (by default taken as root)
 * @returns {string} - post processed HTML body
 */
function relocateStaticResources(htmlInput, srPaths, srBasePath = '') {
	if (!Array.isArray(srPaths) || !srPaths.length) {
		throw new Error(`'srPaths' MUST be a non-empty array; got '${srPaths}'`);
	}

	let htmlOutput = htmlInput;
	for (const srPath of srPaths) {
		const autogeneratedFileName = srPath.match(/^(.*\/|)(?<fileName>[^/]+)$/).groups.fileName;
		const effectiveSrBasePath = srBasePath ? `${srBasePath}/` : '';
		fs.copyFileSync(`${effectiveSrBasePath}${srPath}`, `${AUTOGENERATED_FOLDER_ABSOLUTE}/${autogeneratedFileName}`);
		if (htmlOutput) {
			htmlOutput = htmlOutput.replace(new RegExp(`(href|src)\s*=\s*"?${srPath}"?`, 'g'), `$1="${AUTOGENERATED_FOLDER_RELATIVE}/${autogeneratedFileName}"`);
		}
	}
	return htmlOutput;
}
