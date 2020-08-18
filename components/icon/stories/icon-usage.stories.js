import '@vonage/vwc-icon';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Icon',
	component: 'vwc-icon',
};

export const usage = () => html`<strong>I <vwc-icon type="heart-full" style="vertical-align: middle; fill: red;"></vwc-icon> VIVID!</strong>`;