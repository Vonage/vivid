import { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants';


export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: Object.values(Connotation).filter(c => [
				Connotation.Primary, Connotation.CTA, Connotation.Success, Connotation.Alert, Connotation.Info, Connotation.Warning
			].includes(c)),
		}
	},
	shape: {
		control: {
			type: 'select',
			options: Object.values(Shape).filter(s => [
				Shape.Rounded, Shape.Pill
			].includes(s)),
		}
	},
	layout: {
		control: {
			type: 'select',
			options: Object.values(Layout).filter(l => [
				Layout.Filled, Layout.Outlined, Layout.Soft
			].includes(l)),
		}
	},
	dense: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	enlarged: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	styles: { table: { disable: true } },
};
