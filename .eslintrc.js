module.exports = {
	'env': {
		'browser': true,
		'node': true
	},
	'extends': [
		'@open-wc/eslint-config',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:wc/recommended',
		'plugin:compat/recommended',
		'plugin:lit-a11y/recommended',
		// the followings should always be last
		'prettier',
		'prettier/@typescript-eslint'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': ['@typescript-eslint', 'mocha', 'wc', 'no-only-tests', 'lit-a11y'],
	'settings': {
		'wc': {
			'elementBaseClasses': ['BaseElement', 'LitElement', 'FormElement']
		}
	},
	'rules': {
		'no-shadow': 'error',
		'no-mixed-spaces-and-tabs': 'off',
		'compat/compat': 'error',
		'indent': 'off',
		'linebreak-style': ['error', 'unix'],
		'semi': ['error', 'always'],
		'no-unused-vars': [
			'error',
			{
				'varsIgnorePattern': '^(?:(?:MDC(?:(?:[A-Z][a-z0-9]+)+)Adapter)|(?:(?:(?:[A-Z][a-z0-9]+)+)Type))$'
			}
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/indent': 'off',
		'max-len': 'off',
		'block-spacing': 'off',
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{ 'accessibility': 'no-public' }
		],
		'no-new': 'warn',
		'quotes': ['error', 'single', { 'avoidEscape': true }],
		'no-var': 'error',
		'curly': 'error',
		'no-floating-decimal': 'error',
		'require-jsdoc': 'off',
		'valid-jsdoc': 'off',
		'prefer-const': 'error',
		'comma-dangle': 'off',
		'mocha/handle-done-callback': 'error',
		'mocha/no-exclusive-tests': 'error',
		'mocha/no-identical-title': 'error',
		'mocha/no-nested-tests': 'error',
		'mocha/no-pending-tests': 'error',
		'mocha/no-skipped-tests': 'error'
	},
	'overrides': [
		{
			'files': ['{common,components}/**/*.ts'],
			'rules': {
				'no-unused-vars': 'off',
				'no-invalid-this': 'off',
				'new-cap': 'off'
			}
		},
		{
			'files': ['**/test/**/*.js', '**/stories/**/*.js'],
			'rules': {
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'no-only-tests/no-only-tests': 'error',
				'quotes': 'off',
				'no-var': 'off',
				'curly': 'off',
				'no-floating-decimal': 'off',
				'no-unused-vars': 'off',
				'prefer-const': 'off',
				'comma-dangle': 'off'
			},
			'globals': {
				'chai': false,
				'it': false,
				'describe': false,
				'expect': false,
				'assert': false,
				'afterEach': false,
				'beforeEach': false
			}
		}
	]
}
