import '@vonage/vwc-fab/vwc-fab.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Fab',
	component: 'vwc-fab',
	argTypes
}

const Template = args => html`<vwc-fab ...=${spread(args)} @click="${onClick}"></vwc-fab>`;

export const Mini = Template.bind({});
Mini.args = { mini: '', icon: 'store' };

export const Extended = Template.bind({});
Extended.args = { extended: '', label: 'Add to cart', icon: 'wallet' };

function onClick(event) {
	console.log(`'${event.target.getAttribute('icon')}' fab clicked`);
}
