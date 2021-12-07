const booleanControl = {
	type: 'inline-radio',
	options: { true: '', false: undefined }
};

export const argTypes = {
	alternate: {
		control: booleanControl
	},
	open: {
		control: booleanControl
	},
	side: {
		defaultValue: 'left',
		control: {
			type: 'select',
			options: ['left', 'right'],
		}
	},
	type: {
		control: {
			type: 'select',
			options: ['', 'modal', 'dismissible'],
		}
	},
	hasTopBar: {
		control: booleanControl
	},
};
