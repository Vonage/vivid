import { Connotation, Shape } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: Object.values(Connotation),
		}
	},
	shape: {
		control: {
			type: 'select',
			options: Object.values(Shape),
		}
	},
	translucent: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	}
}
