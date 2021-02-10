module.exports = {
	'{common,components}/**/*.scss':['stylelint --fix'],
	'{common,components}/**': ['eslint --fix --no-error-on-unmatched-pattern'],
	'{{common,components}/**/*.{ts,scss},**/stories,**/test/*.test.js}': 'prettier --write'
}
