import '@vonage/vwc-linear-progress/vwc-linear-progress.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Linear Progress',
	component: 'vwc-linear-progress',
	argTypes
}

const Template = args => html`<vwc-linear-progress ...=${spread(args)}></vwc-linear-progress>`;

export const Default = Template.bind({});
Default.args = { progress: '0.5' };

export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: '', progress: '' };
