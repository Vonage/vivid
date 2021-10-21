import { Connotation, Position } from '@vonage/vvd-foundation/constants.js';

const DISABLED = Object.freeze({ table: { disable: true } });

export const argTypes = {
	connotation: {
		control: {
			type: 'select',
			options: [
				Connotation.Alert,
				Connotation.Announcement,
				Connotation.Info,
				Connotation.Success,
				Connotation.Warning,
			],
		}
	},
	dismissible: {
		control: {
			type: 'inline-radio',
			options: { 'true': '', 'false': undefined }
		}
	},
	position: {
		control: {
			type: 'select',
			options: [
				`${Position.Top}-${Position.Start}`,
				`${Position.Top}-${Position.Center}`,
				`${Position.Top}-${Position.End}`,
				`${Position.Bottom}-${Position.Start}`,
				`${Position.Bottom}-${Position.Center}`,
				`${Position.Bottom}-${Position.End}`
			],
		}
	},

	closeOnEscape: DISABLED,
	labelText: DISABLED,
	leading: DISABLED,
	opener: DISABLED,
	openerId: DISABLED,
	ripple: DISABLED,
	snackbarArgs: DISABLED,
	stacked: DISABLED,
}
