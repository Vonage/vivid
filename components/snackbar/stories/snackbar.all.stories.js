import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

export { Modern } from './snackbar.modern';

export { Legacy, LegacyDismissible, LegacyFull } from './snackbar.legacy';