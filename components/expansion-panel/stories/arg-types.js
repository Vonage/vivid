export const argTypes = {
	header: {
		control: {
			type: 'text'
		}
	},
	indicatorIconSet: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
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
	trailingIcon: { table: { disable: true } }
}
