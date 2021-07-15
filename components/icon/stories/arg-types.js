import { IconSize, Connotation } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: Object.values(Connotation).filter(c => [
				Connotation.Primary, Connotation.CTA, Connotation.Announcement, Connotation.Success, Connotation.Alert, Connotation.Info
			].includes(c)),
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
