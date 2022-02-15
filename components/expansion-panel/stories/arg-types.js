export const argTypes = {
	header: {
		control: {
			type: 'text'
		}
	},
	'heading-level': {
		control: {
			type: 'select',
			options: ['2', '3', '4', '5', '6'],
		}
	},
	caption: {
		control: {
			type: 'text'
		}
	},
	metaData: {
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
	dense: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	leadingToggle: {
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
	noRipple: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
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
	trailingIcon: { table: { disable: true } },
	ripple: { table: { disable: true } }
}
