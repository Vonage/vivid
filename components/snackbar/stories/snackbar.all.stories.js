import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

export { Basic, Dismissible, Action } from './snackbar';

export { Legacy, LegacyDismissible, LegacyAction } from './snackbar.legacy';