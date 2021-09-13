import { Size } from '@vonage/vvd-foundation/constants';
import { InlineTemplate } from '../vwc-inline';
// Example use:
const SIZE = { ...Size, Block: 'block' };
export const argTypes = {
	template: {
		control: {
			type: 'select',
			options: Object.values(InlineTemplate),
		}
	},
	columnBasis: {
		control: {
			type: 'select',
			options: Object.values(SIZE).filter(s => ([SIZE.Small, SIZE.Medium, SIZE.Large, SIZE.Block].includes(s))),
		}
	},
	columnSpacing: {
		control: {
			type: 'select',
			options: Object.values(Size).filter(s => [Size.Medium, Size.x_Large].includes(s)),
		}
	}
};
