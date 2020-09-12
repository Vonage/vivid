export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta', 'success', 'error', 'info', 'announcement'],
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
			options: ['rounded', 'pill'],
		}
	},
	dense: {
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
}
