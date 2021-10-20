module.exports = {
	env: {
		browser: true,
		node: true,
	},
	plugins: [
		'wc',
		'lit',
		'lit-a11y',
		'@typescript-eslint'
	],
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:compat/recommended',
		'plugin:wc/recommended',
		'plugin:wc/best-practice',
		'plugin:lit/recommended',
		'plugin:lit-a11y/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
	],
	settings: {
		wc: {
			elementBaseClasses: ['BaseElement', 'LitElement', 'FormElement'],
		},
	},
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'no-shadow': 'error',
		'compat/compat': 'error',
		'linebreak-style': ['error', 'unix'],
		semi: ['error', 'always'],
		'no-mixed-spaces-and-tabs': 'off', //! remove gradually
		'no-use-before-define': 'off', //! remove gradually
		'object-shorthand': 'off', //! remove gradually
		'import/extensions': ['error', 'always'],
		'import/no-extraneous-dependencies': 'off', //! remove gradually
		'import/order': 'off', //! remove gradually
		'import/newline-after-import': 'off', //! remove gradually
		'import/no-unresolved': 'off', //! remove gradually
		'import/no-named-default': 'off', //! remove gradually
		'one-var': 'off', //! remove gradually
		'prefer-arrow-callback': 'off', //! remove gradually
		'func-names': 'off', //! remove gradually
		'spaced-comment': 'off', //! remove gradually
		'prefer-destructuring': 'off', //! remove gradually
		'arrow-body-style': 'off', //! remove gradually
		'prefer-promise-reject-errors': 'off', //! remove gradually
		'no-console': 'off', //! remove gradually
		'no-param-reassign': 'off', //! remove gradually
		'array-callback-return': 'off', //! remove gradually
		'consistent-return': 'off', //! remove gradually
		'no-restricted-syntax': 'off', //! remove gradually
		'guard-for-in': 'off', //! remove gradually
		'no-cond-assign': 'off', //! remove gradually
		camelcase: 'off', //! remove gradually
		'no-return-assign': 'off', //! remove gradually
		'no-plusplus': 'off', //! remove gradually
		'class-methods-use-this': 'off', //! remove gradually
		'lines-between-class-members': 'off', //! remove gradually
		'prefer-object-spread': 'off', //! remove gradually
		'no-multi-assign': 'off', //! remove gradually
		'no-unused-expressions': 'off', //! remove gradually
		eqeqeq: 'off', //! remove gradually
		'wc/guard-super-call': 'off', //! remove gradually
		'no-bitwise': 'off', //! remove gradually
		radix: 'off', //! remove gradually
		'no-else-return': 'off', //! remove gradually
		// 'no-unused-vars': 'error', //! remove gradually
		'no-undef': 'off',
		'no-multiple-empty-lines': 'off',
		'operator-linebreak': 'off',
		'max-len': 'off',
		'block-spacing': 'off',
		'no-new': 'warn',
		quotes: ['error', 'single', { avoidEscape: true }],
		'no-var': 'error',
		// curly: 'error', //! remove gradually
		'no-floating-decimal': 'error',
		'require-jsdoc': 'off',
		'import/default': 'off',
		'valid-jsdoc': 'off',
		'prefer-const': 'error',
		'comma-dangle': 'off',
		'@typescript-eslint/no-extra-semi': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{ accessibility: 'no-public' },
		],
	},
	overrides: [
		{
			files: '**/test{,s}/**/*.js',
			plugins: [
				'mocha',
				'no-only-tests'
			],
			extends: [
				'plugin:mocha/recommended',
			],
			rules: {
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				quotes: 'off', //! remove gradually
				'no-unused-vars': 'off', //! remove gradually
				'import/extensions': 'off', //! remove gradually
				'prefer-const': 'off', //! remove gradually
				'comma-dangle': 'off', //! remove gradually
				'mocha/mocha/no-exports': 'off', //! remove gradually
				'mocha/no-async-describe': 'off', //! remove gradually
				'no-only-tests/no-only-tests': 'error',
				'mocha/no-mocha-arrows': 'off',
				'mocha/no-setup-in-describe': 'off',
				'mocha/handle-done-callback': 'error',
				'mocha/no-exclusive-tests': 'error',
				'mocha/no-identical-title': 'error',
				'mocha/no-nested-tests': 'error',
				'mocha/no-pending-tests': 'error',
				'mocha/no-skipped-tests': 'error',
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
		{
			files: '**/stories/**/*.js',
			rules: {
				'import/extensions': 'off', //! remove gradually
				'prefer-const': 'off', //! remove gradually
				quotes: 'off', //! remove gradually
				semi: 'off', //! remove gradually
				'no-unused-vars': 'off', //! remove gradually
				'lit/no-invalid-html': 'off', //! remove gradually
				indent: 'off', //! remove gradually
			}
		}
	],
};
