export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta', 'success', 'error', 'info', 'announcement'],
		}
	},
	translucent: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	}
}
