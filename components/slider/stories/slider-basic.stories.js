import '@vonage/vwc-slider/vwc-slider.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Slider',
	component: 'vwc-slider',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Continuous</h3>
	<vwc-slider value="30" min="0" max="100"></vwc-slider>

	<h3>Discrete with markers</h3>
	<vwc-slider value="10" min="0" max="70" step="10" markers></vwc-slider>

	<h3>Discrete with pin</h3>
	<vwc-slider value="70" min="0" max="99" step="5" pin></vwc-slider>
`;