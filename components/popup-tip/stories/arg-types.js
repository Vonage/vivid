const booleanControl = {
	type: 'inline-radio',
	options: { true: '', false: undefined }
};

export const argTypes = {
	dismissible: {
		control: booleanControl
	},
	placement: {
		control: {
			type: 'select',
			defaultValue: 'auto',
			options: ['auto'
				, 'auto-start'
				, 'auto-end'
				, 'top'
				, 'top-start'
				, 'top-end'
				, 'bottom'
				, 'bottom-start'
				, 'bottom-end'
				, 'right'
				, 'right-start'
				, 'right-end'
				, 'left'
				, 'left-start'
				, 'left-end']

		}
	},
};
