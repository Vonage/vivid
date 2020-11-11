import os from 'os';
import fs from 'fs';
import { resolve } from 'path';
import _ from 'lodash';
import StyleDictionaryPackage from 'style-dictionary';

const CUSTOM_TYPOGRAPHY_FORMAT = 'custom/web/scss/typography',
	OUTPUT_FOLDER = 'build/scss/typography-variables';

StyleDictionaryPackage.registerFormat({
	name: CUSTOM_TYPOGRAPHY_FORMAT,
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-typography.template'))
	),
});

function getStyleDictionaryConfig(key, path) {
	return {
		source: [path],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'scss',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `${OUTPUT_FOLDER}/_${key}.scss`,
						format: CUSTOM_TYPOGRAPHY_FORMAT
					}
				]
			}
		}
	};
}

export const render = () => {
	console.log('\n==============================================');
	console.log(`\nProcessing typography variables`);

	const indexEntries = [];
	const propertiesFolder = resolve('../../node_modules/@vonage/vvd-design-tokens-properties');
	const typographyFolder = resolve(propertiesFolder, 'globals', 'typography');

	const categoryFiles = fs.readdirSync(typographyFolder);
	console.log(`\tprocessing ${categoryFiles.length} category/ies`);

	categoryFiles.forEach(categoryFile => {
		const categoryKey = categoryFile.replace(/\.json$/, '');
		const categoryPath = resolve(typographyFolder, categoryFile);
		const dictionaryConfig = getStyleDictionaryConfig(categoryKey, categoryPath);
		StyleDictionaryPackage.extend(dictionaryConfig).buildPlatform('web');
		indexEntries.push(categoryKey);
	});

	createCategoriesIndex(indexEntries);

	console.log('\nEnd processing');
};

function createCategoriesIndex(entryKeys) {
	const PARAM_NAME = '$category';
	const outputLines = [];

	//	create @use directives
	entryKeys.forEach(entryKey => outputLines.push(`@use '${entryKey}';`));
	outputLines.push(os.EOL);

	//	create include-variables mixin
	outputLines.push(`@mixin include-category(${PARAM_NAME}) {`);
	entryKeys.forEach((entryKey, i) => {
		outputLines.push(`\t${i === 0 ? '@if' : '} @else if'} ${PARAM_NAME} == '${entryKey}' {`);
		outputLines.push(`\t\t@include ${entryKey}.variables;`);
	});
	outputLines.push('\t}');
	outputLines.push('}');

	//	write the file
	fs.writeFileSync(
		`${OUTPUT_FOLDER}/index.scss`,
		outputLines.join(os.EOL),
		{ encoding: 'utf-8' }
	);
}