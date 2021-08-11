import { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';


export const argTypes = {
	'font-face': {
		control: {
			type: 'select',
			options: Object.values(VVDFontFace),
		}
	},
	connotation: {
		control: {
			type: 'select',
			options: ['primary', 'cta', 'announcement', 'info', 'success', 'alert'],
		}
	},
	styles: { table: { disable: true } },
};
