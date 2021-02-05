import { render as schemesRender } from './builders/render-schemes.js';
import { render as schemesCouplingRender } from './builders/render-schemes-coupling.js';
import { render as typographyRender } from './builders/render-typography.js';


console.log('\n\x1b[32m=== Design tokens build started ====\x1b[0m');


schemesRender();
schemesCouplingRender();
typographyRender();

console.log('\n\x1b[32m=== Design tokens build completed ====\n\x1b[0m');
