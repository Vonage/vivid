// import { Size } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	size: {
		control: {
			type: 'select',
			options: ['small', 'medium', 'large'],
		}
	},
	inline: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
}
