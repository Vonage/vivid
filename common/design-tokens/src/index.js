import { render as themesRender } from './builders/render-themes.js';
import { render as themesSassRender } from './builders/render-themes-sass.js';
import { renderTypographySassMixin, renderTypographyTypes } from './builders/typography/index.js';
import { renderSizing, renderSizingSassMixin } from './builders/sizing/index.js';

console.log('\n\x1b[32m=== Design tokens build started ====\x1b[0m');

themesRender();
themesSassRender();
renderTypographySassMixin();
renderTypographyTypes();
renderSizing();
renderSizingSassMixin();

console.log('\n\x1b[32m=== Design tokens build completed ====\n\x1b[0m');
