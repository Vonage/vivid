const ICON_CONNOTATIONS = ['primary', 'cta', 'announcement', 'success', 'alert', 'warning', 'info'];
const ICON_SIZES = ['small', 'medium', 'large'];

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: [undefined, ...ICON_CONNOTATIONS],
		}
	},
	size: {
		control: {
			type: 'select',
			options: ICON_SIZES,
		}
	},
	inline: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined }
		}
	},
};
