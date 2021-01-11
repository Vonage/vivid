export const argTypes = {
	checked: {
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
	styles: { table: { disable: true } },
	reducedTouchTarget: { table: { disable: true } },
	isRippleActive: { table: { disable: true } },
	ripple: { table: { disable: true } },
	global: { table: { disable: true } }
}
