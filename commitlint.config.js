const {utils: {getPackages}} = require('@commitlint/config-lerna-scopes');

const customScopes = ['workspace'];

module.exports = {
   rules: {
      'scope-enum': async ctx =>
          [2, 'always', [...customScopes,...(await getPackages(ctx))]]
   }
}
