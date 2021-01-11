import fs from 'fs';

const DEFAULT_ANIMATION_PATH = `src/vonage-logo-spinner.gif`;
const CSS_DEFINITION_OUTPUT_PATH = `src/vwc-loading-overlay-default.scss`;
const CSS_DEFINITION_TEMPLATE_PATH = `${CSS_DEFINITION_OUTPUT_PATH}.template`;
const DEFAULT_ANIMATION_PLACEHOLDER = 'DEFAULT_ANIMATION_PLACEHOLDER';

const imageBinary = fs.readFileSync(DEFAULT_ANIMATION_PATH);
const imageBase64 = imageBinary.toString('base64');
const cssPreProc = fs.readFileSync(CSS_DEFINITION_TEMPLATE_PATH, { encoding: 'utf-8' });
fs.writeFileSync(CSS_DEFINITION_OUTPUT_PATH, cssPreProc.replace(DEFAULT_ANIMATION_PLACEHOLDER, imageBase64), { encoding: 'utf-8' });