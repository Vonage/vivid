import '@vonage/vwc-tooltip';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Tooltip',
	component: 'vwc-tooltip',
	argTypes
}

const Template = args => html`<vwc-tooltip open ...=${spread(args)}></vwc-tooltip>`;

export const Basic = Template.bind({});
Basic.args = { text: 'lalalalalalalalalalalalalalalalalalalalalalalala' };

