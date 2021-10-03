export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta', 'success', 'error', 'info', 'announcement'],
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
