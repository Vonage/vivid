export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta', 'success', 'error', 'info', 'announcement'],
		}
	},
	topPosition: {
		control: {
			type: 'select',
			options: ['small', 'medium', 'large', 'xlarge'],
		}
	},
	disabled: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	styles: { table: { disable: true } },
}
