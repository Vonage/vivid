module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'@open-wc/eslint-config',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:wc/recommended',
		'@open-wc/eslint-config',
		'plugin:compat/recommended',
		'plugin:lit/recommended',
		'plugin:lit-a11y/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'mocha', 'wc', 'no-only-tests', 'lit-a11y'],
	settings: {
		wc: {
			elementBaseClasses: ['BaseElement', 'LitElement', 'FormElement'],
		},
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'no-shadow': 'error',
		'no-mixed-spaces-and-tabs': 'off',
		'compat/compat': 'error',
		'linebreak-style': ['error', 'unix'],
		semi: ['error', 'always'],
		'no-use-before-define': 'off', //! should remove after PR merge
		'import/no-extraneous-dependencies': 'off', //! should remove after PR merge
		'object-shorthand': 'off', //! should remove after PR merge
		'import/order': 'off', //! should remove after PR merge
		'import/newline-after-import': 'off', //! should remove after PR merge
		'import/no-unresolved': 'off', //! should remove after PR merge
		'import/no-named-default': 'off', //! should remove after PR merge
		'one-var': 'off', //! should remove after PR merge
		'prefer-arrow-callback': 'off', //! should remove after PR merge
		'func-names': 'off', //! should remove after PR merge
		'import/extensions': 'off', //! should remove after PR merge
		'spaced-comment': 'off', //! should remove after PR merge
		'prefer-destructuring': 'off', //! should remove after PR merge
		'arrow-body-style': 'off', //! should remove after PR merge
		'import/no-duplicates': 'off', //! should remove after PR merge
		'prefer-promise-reject-errors': 'off', //! should remove after PR merge
		'no-console': 'off', //! should remove after PR merge
		'no-param-reassign': 'off', //! should remove after PR merge
		'array-callback-return': 'off', //! should remove after PR merge
		'consistent-return': 'off', //! should remove after PR merge
		'no-restricted-syntax': 'off', //! should remove after PR merge
		'guard-for-in': 'off', //! should remove after PR merge
		'no-cond-assign': 'off', //! should remove after PR merge
		camelcase: 'off', //! should remove after PR merge
		'no-return-assign': 'off', //! should remove after PR merge
		'no-plusplus': 'off', //! should remove after PR merge
		'class-methods-use-this': 'off', //! should remove after PR merge
		'lines-between-class-members': 'off', //! should remove after PR merge
		'prefer-object-spread': 'off', //! should remove after PR merge
		'no-multi-assign': 'off', //! should remove after PR merge
		'no-unused-expressions': 'off', //! should remove after PR merge
		eqeqeq: 'off', //! should remove after PR merge
		'wc/guard-super-call': 'off', //! should remove after PR merge
		'no-bitwise': 'off', //! should remove after PR merge
		radix: 'off', //! should remove after PR merge
		'no-else-return': 'off', //! should remove after PR merge
		'no-unused-vars': 'error',
		'lit/no-template-bind': 'off',
		'lit/binding-positions': 'off',
		'@typescript-eslint/no-extra-semi': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{ accessibility: 'no-public' },
		],
		'no-multiple-empty-lines': 'off',
		'operator-linebreak': 'off',
		'max-len': 'off',
		'block-spacing': 'off',
		'no-new': 'warn',
		quotes: ['error', 'single', { avoidEscape: true }],
		'no-var': 'error',
		curly: 'error',
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
		'mocha/no-skipped-tests': 'error',
	},
	overrides: [
		{
			files: ['{common,components}/**/*.ts'],
			rules: {
				'no-unused-vars': 'off',
				'no-invalid-this': 'off',
				'new-cap': 'off',
			},
		},
		{
			files: ['**/test/**/*.js', '**/stories/**/*.js'],
			rules: {
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'no-only-tests/no-only-tests': 'error',
				quotes: 'off',
				'no-var': 'off',
				curly: 'off',
				'no-floating-decimal': 'off',
				'no-unused-vars': 'off',
				'prefer-const': 'off',
				'comma-dangle': 'off',
			},
			globals: {
				chai: false,
				it: false,
				describe: false,
				expect: false,
				assert: false,
				afterEach: false,
				beforeEach: false,
			},
		},
	],
};
