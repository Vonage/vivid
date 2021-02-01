import '@vonage/vwc-icon';
import { html } from 'lit-element';

export default {
	title: 'Components/Atoms/Icon',
	component: 'vwc-icon',
};

export const usage = () => html`<strong>I <vwc-icon type="heart-full" size="medium" style="vertical-align: middle; color: red;"></vwc-icon> VIVID!</strong>`;