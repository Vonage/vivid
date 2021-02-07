module.exports = {
	"extends": [
		"stylelint-config-sass-guidelines",
		"stylelint-a11y/recommended",
		"stylelint-config-idiomatic-order",
		"stylelint-config-prettier" // should always be last
	],
	"plugins": ["stylelint-no-unsupported-browser-features", "stylelint-a11y"],
	"rules": {
		"plugin/no-unsupported-browser-features": [
			true,
			{
				"severity": "warning"
			}
		],
		"order/properties-alphabetical-order": null,
		"selector-max-id": null,
		"selector-class-pattern": null,
		"max-nesting-depth": null,
		"a11y/selector-pseudo-class-focus": null,
		"a11y/no-outline-none": null
	}
}
