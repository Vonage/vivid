import { Connotation } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	datetime: {
		control: {
			type: 'text'
		}
	},
	locales: {
		control: {
			type: 'text'
		}
	},
	hour12: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
};
