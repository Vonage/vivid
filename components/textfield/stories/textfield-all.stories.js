import '@vonage/vwc-textfield';
import '@vonage/vwc-list';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Textfield',
	component: 'vwc-textfield',
	argTypes
};

export {
	LoginForm
} from './textfield-form.stories.js';
export {
	Autofocus,
	Default,
	Dense,
	Disabled,
	Icon,
	PillShape,
	Validation,
  AutoValidation
} from './textfield-variants.stories.js';

export {
	Autocomplete
} from './textfield-autocomplete.stories';