module.exports = {
	"{common,components}/**/*.scss": ["stylelint --fix"],
	"{common,components}/*/src/**/*.{js,ts}": [
		"eslint --fix --no-error-on-unmatched-pattern",
	],
	'{common,components}/*/src/**/*.ts': ["lit-analyzer  --strict --quiet --format"],
};
