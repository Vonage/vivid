const DISABLED = Object.freeze({ table: { disable: true } });

export const argTypes = {
	activatable: DISABLED,

	corner: {
		control: {
			type: 'select',
			options: ['TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT', 'TOP_START', 'TOP_END', 'BOTTOM_START', 'BOTTOM_END'],
		}
	},
	defaultFocus: {
		control: {
			type: 'select',
			options: ['NONE', 'LIST_ROOT', 'FIRST_ITEM', 'LAST_ITEM'],
		}
	},

	forceGroupSelection: DISABLED,
	index: DISABLED,
	items: DISABLED,
	mdcRoot: DISABLED,
	ripple: DISABLED,
	styles: DISABLED
}
