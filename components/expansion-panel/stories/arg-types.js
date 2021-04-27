export const argTypes = {
	header: {
		control: {
			type: 'text'
		}
	},
	indicatorIconSet: {
		control: {
			type: 'select',
			options: ['chevron', 'binary'],
		}
	},
	trailingToggle: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	icon: {
		control: {
			type: 'text'
		}
	},
	open: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	styles: { table: { disable: true } },
	closeOnSelect: { table: { disable: true } },
	headerListItemIcon: { table: { disable: true } },
	trailingIcon: { table: { disable: true } }
}
