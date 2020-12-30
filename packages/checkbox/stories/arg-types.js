export const argTypes = {
	checked: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	indeterminate: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	disabled: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	reducedTouchTarget: { table: { disable: true } },
	isRippleActive: { table: { disable: true } },
	styles: { table: { disable: true } },
	ripple: { table: { disable: true } }
}
