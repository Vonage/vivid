import { Connotation, Shape } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta', 'info', 'success', 'alert', 'warning']
		}
	},
	shape: {
		control: {
			type: 'select',
			options: Object.values(Shape)
		}
	},
	layout: {
		control: {
			type: 'select',
			options: ['filled', 'outlined', 'soft']
		}
	},
	disabled: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
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
	}
}
