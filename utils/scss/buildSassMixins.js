const
	fs = require('fs'),
	path = require('path');
const {argv} = require('yargs');
const outputPath = path.join(process.cwd(), 'common/design-tokens/build');

if (!fs.existsSync(outputPath)){
	fs.mkdirSync(outputPath);
}

function sassFilePath({sassOutputFilePath, mixinName}) {
	return sassOutputFilePath ? sassOutputFilePath : path.join(outputPath, `${mixinName}.scss`);
}

/**
 *
 * @param config {
 *   mixinName: String,
 *   mixinCombinations: Object,
 *   sassOutputFilePath: String (optional)
 * }
 */
module.exports = function generateMixins(config) {
	const { mixinName, mixinCombinations} = config;

	const
		mixinTemplate = (mixinCombos)=> `@mixin ${mixinName}($combo-id){
			${Object
			.entries(mixinCombos)
			.map(([identifier, styles])=> `\t@if($combo-id == "${identifier}"){${Object.entries(styles).map(([modifier, value])=>"\n\t\t"+[modifier, value].join(': ') + ";").join('')+"\n\t"}}`)
			.join('\n')
		}
	}`,
		variablesTemplate = (function(){
			const kebabCase = (txt)=> txt.toLowerCase().replace(/[_\s]+/g, '-');
			return (prefix = "vvd")=> (mixinCombos)=> {
				return Object
					.entries(mixinCombos)
					.flatMap(([identifier, styles])=>{
						return Object
							.entries(styles)
							.map(([styleName, styleValue])=>{
								return `$${[[prefix, identifier, styleName].map(kebabCase).join('-'), styleValue].join(': ')}`;
							});
					})
					.concat([''])
					.join(";\n");
			};
		})();

	let outStream = argv.d ? process.stdout : fs.createWriteStream(sassFilePath(config));
	outStream.end([mixinTemplate, variablesTemplate('vvd')].map((template)=> template(mixinCombinations)).join('\n'));
}