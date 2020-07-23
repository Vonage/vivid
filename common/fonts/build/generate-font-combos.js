const FONT_DESIGN_COMBINATIONS = {
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
	"Body": {
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

process.stdout.end(`@mixin font-combo($combo-id){
	${Object
	.entries(FONT_DESIGN_COMBINATIONS)
	.map(([identifier, styles])=>{
		return `\t@if($combo-id == "${identifier}"){${Object.entries(styles).map(([modifier, value])=>"\n\t\t"+[modifier, value].join(': ') + ";").join('')+"\n\t"}}`;
	})
	.join('\n')
}
}`);