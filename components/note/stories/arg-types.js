import { Connotation } from '@vonage/vvd-foundation/constants.js';

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: Object.values(Connotation).filter(c => [
				Connotation.Success, Connotation.Alert, Connotation.Warning, Connotation.Info, Connotation.Announcement
			].includes(c)),
		}
	}
}
