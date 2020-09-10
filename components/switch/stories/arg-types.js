export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta', 'success', 'error'],
		}
	},
  enlarged: {
    control: {
      type: 'inline-radio',
      options: { 'true': '', 'false': undefined }
    }
  },
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
	ripple: { table: { disable: true } }
}
