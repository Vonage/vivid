import { Connotation, Layout, Shape } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	dense: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined }
		}
	},
	enlarged: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined }
		}
	},
	disabled: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined }
		}
	},
	on: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined }
		}
	},
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
			options: Object.values(Layout).filter(l => [
				Layout.Filled, Layout.Outlined, Layout.Ghost
			].includes(l)),
		}
	},
	shape: {
		control: {
			type: 'select',
			options: Object.values(Shape).filter(s => [
				Shape.Rounded, Shape.Circled
			].includes(s)),
		}
	},
	styles: { table: { disable: true } },
	buttonElement: { table: { disable: true } },
	ripple: { table: { disable: true } }
};
