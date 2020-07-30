const SHADOW_LEVELS = {
	"Shadow100": {
		"box-shadow": "0px 2px 10px rgba(19, 20, 21, 0.1)",
	},
	"Shadow200": {
		"box-shadow": "0px 4px 20px rgba(19, 20, 21, 0.1)",
	},
	"Shadow300": {
		"box-shadow": "0px 10px 30px rgba(19, 20, 21, 0.1)",
	},
	"Shadow400": {
		"box-shadow": "0px 20px 40px rgba(19, 20, 21, 0.1)",
	}
};

module.exports = {
	mixinName: 'shadow-box-combo',
	mixinCombinations: SHADOW_LEVELS
}