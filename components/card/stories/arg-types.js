export const argTypes = {
	layout: {
		control: {
			type: 'select',
			options: ['large', 'basic'],
		}
	},
	icon: {
		control: {
			type: 'input',
		}
	},
	'badge-content': {
		control: {
			type: 'input'
		}
	},
	styles: { table: { disable: true } },
};

