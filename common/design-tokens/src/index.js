import { render as schemesRender } from './builders/render-schemes.js';
import { render as schemesCouplingRender } from './builders/render-schemes-coupling.js';
import { render as typographyRender } from './builders/render-typography-new.js';

console.log('Build started...');

schemesRender();
schemesCouplingRender();
typographyRender();

console.log('\n==============================================');
console.log('\nBuild completed!');
