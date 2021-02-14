import '@vonage/vwc-icon';
import '@vonage/vwc-button/vwc-button.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Icon',
	component: 'vwc-icon',
	argTypes
};

const Template = args => html`I <vwc-icon ...=${spread(args)}></vwc-icon> VIVID!`;

export const Basic = Template.bind({});
Basic.args = { size: 'medium', inline: true, type: 'heart', style: 'color: red' };
