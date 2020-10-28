import { render as schemesRender } from './render-schemes.js';
import { render as schemesCouplingRender } from './render-schemes-coupling.js';

console.log('Build started...');

schemesRender();
schemesCouplingRender();

console.log('\n==============================================');
console.log('\nBuild completed!');
