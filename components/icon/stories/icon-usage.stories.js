import '@vonage/vwc-icon';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Icon',
	component: 'vwc-icon',
	decorators: [withA11y]
};

export const usage = ()=> html`<strong>I <vwc-icon type="heart-full" size="medium" style="vertical-align: middle; color: red;"></vwc-icon> VIVID!</strong>`;