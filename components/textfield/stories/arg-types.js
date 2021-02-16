import { Shape } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	outlined: {
		control: {
			type: 'inline-radio',
			options: { true: '' },
		},
	},
	dense: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined },
		},
	},
	disabled: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined },
		},
	},
	shape: {
		control: {
			type: 'select',
			options: Object.values(Shape).filter(s => [
				Shape.Rounded, Shape.Pill
			].includes(s)),
		}
	},
	required: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined },
		},
	},
	readOnly: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined },
		},
	},
	form: { table: { disable: true } },
	formElement: { table: { disable: true } },
	outlineOpen: { table: { disable: true } },
	ripple: { table: { disable: true } },
	styles: { table: { disable: true } },
	validity: { table: { disable: true } },
	validityTransform: { table: { disable: true } },
};
