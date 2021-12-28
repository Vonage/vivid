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
	position: {
		defaultValue: 'start',
		control: {
			type: 'select',
			options: ['start', 'end'],
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
