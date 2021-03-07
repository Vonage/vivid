import '@vonage/vwc-linear-progress/vwc-linear-progress.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Linear Progress',
	component: 'vwc-linear-progress',
	argTypes
};

const Template = args => html`<vwc-linear-progress ...=${spread(args)}></vwc-linear-progress>`;

export const Default = Template.bind({});
Default.args = { progress: '0.25', buffer: '0.5' };

export const Connotation = Template.bind({});
Connotation.args = { progress: '0.5', buffer: '0.7', connotation: 'success' };

export const Decorative = Template.bind({});
Decorative.args = { progress: '0.5', buffer: '0.7', decoration: 'primary' };

export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: '', progress: '' };
