import { Connotation, Decoration } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: [Connotation.Primary, Connotation.CTA, Connotation.Success, Connotation.Alert],
		}
	},
	decoration: {
		control: {
			type: 'select',
			options: [Decoration.Primary],
		}
	},
	indeterminate: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	closed: {
		description: 'Sets content opacity to 0. Typically should be set to true when loading has finished.',
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	reverse: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	progress: { control: { min: 0, max: 1, step: 0.01 } },
	buffer: { control: { min: 0, max: 1, step: 0.01 } },
	styles: { table: { disable: true } },
	bufferFlexBasisValue: { table: { disable: true } },
	primaryTransformValue: { table: { disable: true } }
}
