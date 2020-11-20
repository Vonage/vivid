import { Connotation } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: Object.values(Connotation),
		}
	}
}
