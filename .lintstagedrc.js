module.exports = {
	"{common,components}/**/*.scss": ["stylelint --quiet --fix"],
	"{common,components}/*/{src,test,stories}/**/*.{js,ts}": [
		"eslint --no-error-on-unmatched-pattern --quiet --fix",
	]
};
