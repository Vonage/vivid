import { Connotation } from '@vonage/vvd-foundation/constants';

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: [Connotation.Primary, Connotation.CTA, Connotation.Success, Connotation.Alert],
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
	progress: { control: { min: 0, max: 1, step: 0.01 } },
	density: { control: { min: -8, max: 8, step: 1 } },
	styles: { table: { disable: true } },
	containerSideLength: { table: { disable: true } },
	circleRadius: { table: { disable: true } },
	determinateStrokeDashOffset: { table: { disable: true } },
	strokeWidth: { table: { disable: true } },
}
