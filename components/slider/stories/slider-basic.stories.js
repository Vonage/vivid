import '@vonage/vwc-slider/vwc-slider.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Slider',
	component: 'vwc-slider',
	decorators: [withA11y]
}

export const basic = () => html`
	<style>
		vwc-slider {
			width: 240px;
		}
	</style>

	<h3>Continuous</h3>
	<vwc-slider value="30" min="0" max="100" @change="${continuousChange}"></vwc-slider>

	<h3>Discrete with markers</h3>
	<vwc-slider value="10" min="0" max="70" step="10" pin markers @change="${discreteNoPinChange}"></vwc-slider>

	<h3>Discrete with pin</h3>
	<vwc-slider value="70" min="0" max="119" step="5" pin @change="${descreteWithPinChange}"></vwc-slider>
`;

function continuousChange(e) {
	console.log('continuous', e.detail.value);
}

function discreteNoPinChange(e) {
	console.log('discrete no pin', e.detail.value);
}

function descreteWithPinChange(e) {
	console.log('discrete with pin', e.detail.value);
}