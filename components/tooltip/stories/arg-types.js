const booleanControl = {
	type: 'inline-radio',
	options: { true: '', false: undefined }
};

export const argTypes = {
	open: {
		control: booleanControl
	},
	dismissible: {
		control: booleanControl
	},
	placement: {
		control: {
			type: 'select',
			options: ['top', 'bottom', 'right', 'left'],
		}
	},
};
