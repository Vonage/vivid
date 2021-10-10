import '@vonage/vwc-linear-progress/vwc-linear-progress.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Linear Progress',
	component: 'vwc-linear-progress',
	argTypes
};

const Template = args => html`<vwc-linear-progress ...=${spread(args)}></vwc-linear-progress>`;

export const Default = Template.bind({});
Default.args = { progress: '0.25', buffer: '1' };

export const Buffered = Template.bind({});
Buffered.args = { progress: '0.5', buffer: '0.7', connotation: 'success' };

export const Decorative = Template.bind({});
Decorative.args = { progress: '0.5', buffer: '1', connotation: 'pacific' };

export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: '', progress: '' };
