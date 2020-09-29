export const argTypes = {
	open: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	hasHeader: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	type: {
		control: {
			type: 'select',
			options: ['dismissible', 'modal'],
		},
		defaultValue: ['dismissible']
	},
}
