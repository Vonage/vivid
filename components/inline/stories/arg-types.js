import { Size } from '@vonage/vvd-foundation/constants';
import { InlineTemplate } from '../vwc-inline';
// Example use:
const INLINE_SIZE = { ...Size, Block: 'block' };
export const argTypes = {
	template: {
		control: {
			type: 'select',
			options: Object.values(InlineTemplate),
		}
	},
	inlineSize: {
		control: {
			type: 'select',
			options: Object.values(INLINE_SIZE).filter(s => ([INLINE_SIZE.Small, INLINE_SIZE.Medium, INLINE_SIZE.Large, INLINE_SIZE.Block].includes(s))),
		}
	},
	columnSpacing: {
		control: {
			type: 'select',
			options: Object.values(Size).filter(s => [Size.Medium, Size.x_Large].includes(s)),
		}
	}
};
