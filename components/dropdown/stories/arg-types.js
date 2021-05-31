export const argTypes = {
	corner: {
		control: {
			type: 'select',
			options: ['TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT', 'TOP_START', 'TOP_END', 'BOTTOM_START', 'BOTTOM_END']
		}
	},
	menuCorner: {
		control: {
			type: 'select',
			options: ['START', 'END']
		}
	},
	open: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	quick: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	wrapFocus: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	absolute: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	fixed: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	activatable: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	multi: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	forceGroupSelection: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	fullwidth: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	// anchor: { table: { disable: true } },
	ripple: { table: { disable: true } },
	slotElement: { table: { disable: true } },
	mdcRoot: { table: { disable: true } },
}
