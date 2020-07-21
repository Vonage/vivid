import { html } from 'lit-element';
import { withA11y } from '@storybook/addon-a11y';
import '@vonage/vwc-relative-time';

export default {
	title: 'Miscellaneous|Relative-Time',
	component: 'vwc-relative-time',
	decorators: [withA11y]
}

export const basic = () => {
	return html`<vwc-relative-time live='true' datetime='${Date.now()}'></vwc-relative-time>`;
}
