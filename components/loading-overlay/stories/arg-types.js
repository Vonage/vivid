export const argTypes = {
	delay: {
		control: {
			type: 'number',
			defaultValue: 360,
			description: 'Number of millis to wait before showing \'entertaining\' content'
		}
	},
	timeout: {
		control: {
			type: 'number',
			defaultValue: 12000,
			description: 'Number of millis of maximum time the overlay is shown'
		}
	},
	floatingLabelFoundation: { table: { disable: true } },
	lineRippleFoundation: { table: { disable: true } },
	ripple: { table: { disable: true } }
}
