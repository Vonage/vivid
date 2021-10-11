const control = {
	type: 'inline-radio',
	options: { true: '', false: undefined },
};

export const argTypes = {
	centerTitle: {
		control: control
	},
	dense: {
		control: control
	},
	alternate: {
		control: control
	},
	prominent: {
		control: control
	},
	styles: { table: { disable: true } },
};
