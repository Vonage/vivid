import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

export {
	Basic, Dismissible, Action, ActionWithDismissible
} from './snackbar';

export { Legacy, LegacyDismissible, LegacyAction } from './snackbar.legacy';
