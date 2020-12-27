import '@vonage/vwc-circular-progress/vwc-circular-progress.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Circular Progress',
	component: 'vwc-circular-progress',
	argTypes
}

const Template = args => html`<vwc-circular-progress ...=${spread(args)}></vwc-circular-progress>`;

export const Default = Template.bind({});
Default.args = { progress: '0.7', density: '' };

export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: '', progress: '', density: '' };

export const Density = Template.bind({});
Density.args = { indeterminate: '', progress: '', density: '-4' };
