import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-list/vwc-list';
import '@vonage/vwc-list/vwc-list-item';

export default class Home extends Element {
	async getHtml() {
		return html`
      <vwc-list>
        <vwc-list-item>Item 0</vwc-list-item>
        <vwc-list-item>Item 1</vwc-list-item>
        <vwc-list-item>Item 2</vwc-list-item>
        <vwc-list-item>Item 3</vwc-list-item>
      </vwc-list>
    `;
	}
}
