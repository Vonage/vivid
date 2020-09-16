// const assets = require("./render-assets");
import { render as schemesRender } from './render-schemes.js';
// const typography = require("./render-typography");

console.log('Build started...');

// assets.render();
schemesRender();
// typography.render();

console.log('\n==============================================');
console.log('\nBuild completed!');
