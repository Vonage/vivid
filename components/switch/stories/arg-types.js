import { Connotation } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: Object.values(Connotation).filter(c => [
				Connotation.Primary, Connotation.CTA, Connotation.Success, Connotation.Alert
			].includes(c)),
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
};
