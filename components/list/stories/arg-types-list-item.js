import { Shape } from '@vonage/vvd-foundation/constants';
	
export const argTypes = {
	shape: {
		control: {
			type: 'select',
			options: [...Object.values(Shape).filter(s => [Shape.Rounded].includes(s)), undefined]
		}
	},
	twoline: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	disabled: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	activated: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	selected: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	multipleGraphics: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	hasMeta: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	noninteractive: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	ripple: { table: { disable: true } }
}
