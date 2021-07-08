import { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';


export const argTypes = {
	'font-face': {
		control: {
			type: 'select',
			options: Object.values(VVDFontFace),
		}
	},
	styles: { table: { disable: true } },
};
