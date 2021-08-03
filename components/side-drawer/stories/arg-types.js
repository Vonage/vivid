const booleanControl = {
	type: 'inline-radio',
	options: { true: '', false: undefined }
};

export const argTypes = {
	alternate: {
		control: booleanControl
	},
	modal: {
		control: booleanControl
	},
	open: {
		control: booleanControl
	},
};
