import { withA11y } from '@storybook/addon-a11y';
import { RelativeTime } from '@vonage/relative-time';

export default {
	title: 'Miscellaneous/Relative-Time',
	component: 'vwc-relative-time',
	decorators: [withA11y]
}

export const basic = ()=> {
	return `<relative-time live='true' datetime='${Date.now()}'></relative-time>`
}
