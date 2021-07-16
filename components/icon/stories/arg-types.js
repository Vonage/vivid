import { IconSize, Connotation } from '@vonage/vvd-foundation/constants';

const iconConnotations = Object.values(Connotation).filter(c => [
	Connotation.Primary, Connotation.CTA, Connotation.Announcement, Connotation.Success, Connotation.Alert, Connotation.Info
].includes(c));

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: [undefined, ...iconConnotations],
		}
	},
	size: {
		control: {
			type: 'select',
			options: [IconSize.Small, IconSize.Medium, IconSize.Large],
		}
	},
	inline: {
		control: {
			type: 'inline-radio',
			options: { true: '', false: undefined }
		}
	},
};
