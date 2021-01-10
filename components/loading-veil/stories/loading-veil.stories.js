import '@vonage/vwc-loading-veil.js';
import { html } from 'lit-element';

export default {
	title: 'Components/Composites/Loading Veil',
	component: 'vwc-loading-veil',
	argTypes
}

const Template = () => html`<vwc-loading-veil></vwc-loading-veil>`;

export const Default = Template.bind({});

export const Indeterminate = Template.bind({});
