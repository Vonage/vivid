import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-slider';

export default class Home extends Element {
	async getHtml() {
		return html`
			<h3>Plain slider</h3>
			<vwc-slider value="30" min="0" max="100"></vwc-slider>
			<h3>Stepped slider</h3>
			<vwc-slider value="10" min="0" max="70" step="10" markers pin></vwc-slider>
    `;
	}
}
