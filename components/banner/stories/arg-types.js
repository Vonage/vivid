import { Connotation } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	icon: {
		control: {
			type: 'text'
		}
	},
	dismissible: {
		control: {
			type: 'boolean',
		}
	},
	connotation: {
		control: {
			type: 'select',
			defaultValue: Connotation.Info,
			options: [
				Connotation.Success,
				Connotation.Alert,
				Connotation.Info,
				Connotation.Warning,
				Connotation.Announcement
			],
		}
	}

};
