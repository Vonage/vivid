import { Shape } from '@vonage/vvd-foundation/constants';

const BOOLEAN_DEFAULT_SETUP = {
	control: {
		type: 'radio',
		options: { true: '', false: undefined }
	}
};
const DISABLED_DEFAULT_SETUP = {
	table: {
		disable: true
	}
};

export const argTypes = {
	outlined: BOOLEAN_DEFAULT_SETUP,
	autoValdiate: BOOLEAN_DEFAULT_SETUP,
	dense: BOOLEAN_DEFAULT_SETUP,
	disabled: BOOLEAN_DEFAULT_SETUP,
	shape: {
		control: {
			type: 'select',
			options: Object.values(Shape).filter(s => [
				Shape.Rounded, Shape.Pill
			].includes(s)),
		}
	},
	required: BOOLEAN_DEFAULT_SETUP,
	readOnly: BOOLEAN_DEFAULT_SETUP,
	form: DISABLED_DEFAULT_SETUP,
	formElement: DISABLED_DEFAULT_SETUP,
	outlineOpen: DISABLED_DEFAULT_SETUP,
	ripple: DISABLED_DEFAULT_SETUP,
	styles: DISABLED_DEFAULT_SETUP,
	validity: DISABLED_DEFAULT_SETUP,
	validityTransform: DISABLED_DEFAULT_SETUP,
};
