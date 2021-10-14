const control = {
	type: 'inline-radio',
	options: { true: '', false: undefined },
};

export const argTypes = {
	centerTitle: {
		control
	},
	dense: {
		control
	},
	alternate: {
		control
	},
	prominent: {
		control
	},
	styles: { table: { disable: true } },
};
