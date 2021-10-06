import { Size } from '@vonage/vvd-foundation/constants';
import { AutoSizing } from '../vwc-layout';
// Example use:
const SIZE = { ...Size, Block: 'block' };
export const argTypes = {
	'auto-sizing': {
		control: {
			type: 'select',
			options: Object.values(AutoSizing),
		}
	},
	'column-basis': {
		control: {
			type: 'select',
			options: Object.values(SIZE).filter(s => ([SIZE.Small, SIZE.Medium, SIZE.Large, SIZE.Block].includes(s))),
		}
	},
	'column-spacing': {
		control: {
			type: 'select',
			options: Object.values(Size).filter(s => [Size.x_Small, Size.Medium, Size.x_Large].includes(s)),
		}
	},
	gutters: {
		control: {
			type: 'select',
			options: Object.values(Size).filter(s => [Size.x_Small, Size.Medium, Size.x_Large].includes(s)),
		}
	}
};
