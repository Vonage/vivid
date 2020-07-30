const
	fs = require('fs'),
	path = require('path');

const [outputFilename] = process.argv.slice(2);

const
	OUTPUT_SCSS = "../_typography.scss",
	FONT_DESIGN_COMBINATIONS = {
		"XLarge": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "500",
			"font-stretch": "75%",
			"font-size": "44px"
		},
		"Large": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "500",
			"font-stretch": "75%",
			"font-size": "32px"
		},
		"Medium": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "500",
			"font-stretch": "75%",
			"font-size": "24px"
		},
		"Heading": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "500",
			"font-stretch": "75%",
			"font-size": "20px"
		},
		"SubHeading": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "500",
			"font-stretch": "75%",
			"font-size": "16px"
		},
		"Body1": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "400",
			"font-stretch": "50%",
			"font-size": "16px"
		},
		"Body1Bold": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "600",
			"font-stretch": "50%",
			"font-size": "16px"
		},
		"Body2": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "400",
			"font-stretch": "50%",
			"font-size": "14px"
		},
		"Body2Bold": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "600",
			"font-stretch": "50%",
			"font-size": "14px"
		},
		"Caption": {
			"font-family": "var(--vvd-font-family-spezia)",
			"font-weight": "600",
			"font-stretch": "50%",
			"font-size": "12px"
		}
	};

const
	mixinTemplate = (fontDesignCombos)=> `@mixin font-combo($combo-id){
			${Object
			.entries(fontDesignCombos)
			.map(([identifier, styles])=> `\t@if($combo-id == "${identifier}"){${Object.entries(styles).map(([modifier, value])=>"\n\t\t"+[modifier, value].join(': ') + ";").join('')+"\n\t"}}`)
			.join('\n')
		}
	}`,
	variablesTemplate = (function(){
		const kebabCase = (txt)=> txt.toLowerCase().replace(/[_\s]+/g, '-');
		return (prefix = "vvd")=> (typographyCombos)=> {
			return Object
				.entries(typographyCombos)
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

let outStream = outputFilename === "--" ? process.stdout : fs.createWriteStream(path.join(__dirname, outputFilename || OUTPUT_SCSS));
outStream.end([mixinTemplate, variablesTemplate('vvd')].map((template)=> template(FONT_DESIGN_COMBINATIONS)).join('\n'));