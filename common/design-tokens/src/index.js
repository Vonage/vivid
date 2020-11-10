import { render as schemesRender } from './render-schemes.js';
import { render as schemesCouplingRender } from './render-schemes-coupling.js';
import { render as typographyRender } from './render-typography.js';

console.log('Build started...');

schemesRender();
schemesCouplingRender();
typographyRender();

console.log('\n==============================================');
console.log('\nBuild completed!');
