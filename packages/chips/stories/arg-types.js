export const argTypes = {
	removable: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	selected: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	styles: { table: { disable: true } },
	ripple: { table: { disable: true } },
	type: { table: { disable: true } },
	iconClass: { table: { disable: true } },
	removeIcon: { table: { disable: true } },
	removeIconClass: { table: { disable: true } },
	removeIconFocusable: { table: { disable: true } },
}
