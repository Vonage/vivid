import '@vonage/vwc-badge/vwc-badge.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Badge',
	component: 'vwc-badge',
	argTypes
}

const Template = args => html`<vwc-badge ...=${spread(args)}>lorem ipsum?</vwc-badge>`;

export const Basic = Template.bind({});
Basic.args = { connotation: 'cta' };
