import { Connotation, Role, AriaLive } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	open: {
		control: {
			type: null
		}
	},
	icon: {
		control: {
			type: 'text'
		}
	},
	dismissible: {
		control: {
			type: null,
		}
	},
	role: {
		control: {
			type: 'select',
			defaultValue: Role.Status,
			options: [
				Role.Status,
				Role.Alert,
			]
		}
	},
	ariaLive: {
		control: {
			type: 'select',
			defaultValue: AriaLive.Polite,
			options: [
				AriaLive.Polite,
				AriaLive.Assertive,
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
