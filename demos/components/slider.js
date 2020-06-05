import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-slider/dist/vwc-slider.js';

export default class Home extends Element {
	async getHtml() {
		return html`
			<h3>Continuous</h3>
			<vwc-slider value="30" min="0" max="100"></vwc-slider>
			<h3>Discrete with markers</h3>
			<vwc-slider value="10" min="0" max="70" step="10" markers></vwc-slider>
			<h3>Discrete with pin</h3>
			<vwc-slider value="70" min="0" max="99" step="5" pin></vwc-slider>
    `;
	}
}
