module.exports = {
	...require("@vonage/vvd-umbrella/prettier-config"),
	"stylelint": {
    "extends": [
        "stylelint-config-idiomatic-order",
        "./node_modules/prettier-stylelint/config.js"
    ],
    "rules": {
        "indentation": 4,
        "string-quotes": "single"
    }
}
};