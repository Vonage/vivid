import '@vonage/vwc-slider/vwc-slider.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Slider',
	component: 'vwc-slider',
	argTypes
}

const Template = ({ change, ...args }) => html`
	<style>vwc-slider { width: 240px; }</style>
	<vwc-slider ...=${spread(args)} @change="${change}"></vwc-slider>`;

export const Default = Template.bind({});
Default.args = { value: 30, min: 0, max: 100, change: continuousChange };

export const Pin = Template.bind({});
Pin.args = { value: 70, min: 0, max: 119, step: 5, pin: '', change: descreteWithPinChange };

export const Markers = Template.bind({});
Markers.args = { value: 10, min: 0, max: 70, step: 10, pin: '', markers: '', change: discreteWithMarkerChange };

export const Disabled = Template.bind({});
Disabled.args = { value: 50, disabled: '' };

export const Autofocus = Template.bind({});
Autofocus.args = { value: 33, step: 10, markers: true, autofocus: true };

function continuousChange(e) {
	console.log('continuous', e.detail.value);
}

function descreteWithPinChange(e) {
	console.log('discrete with pin', e.detail.value);
}

function discreteWithMarkerChange(e) {
	console.log('discrete with marker', e.detail.value);
}
