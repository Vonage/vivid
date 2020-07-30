const
	fs = require('fs');
const {argv} = require('yargs');

/**
 *
 * @param config {
 *   mixinName: String,
 *   mixinCombinations: Object,
 *   sassOutputFilePath: String
 * }
 */

module.exports = function generateMixins({ mixinName, mixinCombinations, sassOutputFilePath }) {

	const
		mixinTemplate = (mixinCombos)=> `@mixin ${mixinName}($combo-id){
			${Object
			.entries(mixinCombos)
			.map(([identifier, styles])=> `\t@if($combo-id == "${identifier}"){${Object.entries(styles).map(([modifier, value])=>"\n\t\t"+[modifier, value].join(': ') + ";").join('')+"\n\t"}}`)
			.join('\n')
		}
	}`;

		const variablesTemplate = (function(){
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

	let outStream = argv.d ? process.stdout : fs.createWriteStream(sassOutputFilePath);
	outStream.end([mixinTemplate, variablesTemplate('vvd')].map((template)=> template(mixinCombinations)).join('\n'));
}