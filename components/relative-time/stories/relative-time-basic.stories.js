import { html } from 'lit-element';
import '@vonage/vwc-relative-time';

export default {
	title: 'Miscellaneous/Relative-Time',
	component: 'vwc-relative-time'
}

export const basic = () => html`
	<vwc-relative-time live='true' datetime='${Date.now()}'></vwc-relative-time>
`;
