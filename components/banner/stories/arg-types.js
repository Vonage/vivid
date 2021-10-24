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
	role: {
		control: {
			type: 'select',
			defaultValue: 'status',
			options: [
				'status',
				'alert',
			]
		}
	},
	ariaLive: {
		control: {
			type: 'select',
			defaultValue: 'polite',
			options: [
				'polite',
				'assertive',
			]
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
