import { Size } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	size: {
		control: {
			type: 'select',
			options: Object.values(Size),
		}
	}
}
