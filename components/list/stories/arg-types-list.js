import { Shape } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	shape: {
		control: {
			type: 'select',
			options: [...Object.values(Shape).filter(s => [Shape.Rounded].includes(s)), undefined]
		}
	},
	activatable: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	multi: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	wrapFocus: {
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
	rootTabbable: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	ripple: { table: { disable: true } }
}
