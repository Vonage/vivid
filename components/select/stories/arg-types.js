import { Shape } from '@vonage/vvd-foundation/constants';


export const argTypes = {
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
	form: { table: { disable: true } },
	outlined: { table: { disable: true } },
	outlineOpen: { table: { disable: true } },
	ripple: { table: { disable: true } },
	styles: { table: { disable: true } },
};
