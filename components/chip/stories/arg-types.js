export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta'],
		}
	},
	shape: {
		control: {
			type: 'select',
			options: ['rounded', 'pill'],
		}
	},
	layout: {
		control: {
			type: 'select',
			options: ['soft', 'outlined'],
		}
	},
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
	selected: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined }
		}
	},
	styles: { table: { disable: true } },
};
