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
	type: {
		control: {
			type: 'select',
			options: ['', 'modal', 'dismissible'],
		}
	},
	hasTopBar: {
		control: booleanControl
	},
	absolute: {
		control: booleanControl
	}
};
