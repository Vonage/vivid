import { Connotation, Shape } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: Object.values(Connotation).filter(c => [
				Connotation.Primary, Connotation.CTA, Connotation.Success, Connotation.Alert, Connotation.Info, Connotation.Announcement
			].includes(c)),
		}
	},
	layout: {
		control: {
			type: 'select',
			options: ['text', 'outlined', 'filled'],
		}
	},
	shape: {
		control: {
			type: 'select',
			options: Object.values(Shape).filter(s => [
				Shape.Rounded, Shape.Pill
			].includes(s)),
		}
	},
	dense: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	enlarged: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	disabled: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	trailingIcon: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	fullwidth: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	styles: { table: { disable: true } },
	raised: { table: { disable: true } },
	unelevated: { table: { disable: true } },
	outlined: { table: { disable: true } },
	buttonElement: { table: { disable: true } },
	ripple: { table: { disable: true } }
};
