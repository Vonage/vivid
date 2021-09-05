import { Size } from '@vonage/vvd-foundation/constants';
import { InlineTemplate } from '../vwc-inline';
import { GridTemplate } from '../vwc-inline';

export const argTypes = {
	gridTemplate: {
		control: {
			type: 'select',
			options: Object.values(GridTemplate),
		}
	},
	inlineTemplate: {
		control: {
			type: 'select',
			options: Object.values(InlineTemplate),
		}
	},
	size: {
		control: {
			type: 'select',
			options: Object.values(Size),
		}
	},
	spacing: {
		control: {
			type: 'select',
			options: Object.values(Size).filter(s => [Size.Small, Size.Medium].includes(s)),
		}
	}
};
