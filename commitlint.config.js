const {utils: {getPackages}} = require('@commitlint/config-lerna-scopes');

const customScopes = ['workspace'];

module.exports = {
	extends: '@commitlint/config-conventional',
	rules: {
		'scope-enum': async ctx =>
			[2, 'always', [...customScopes,...(await getPackages(ctx))]]
	}
}
