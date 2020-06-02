import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-select';
import '@vonage/vwc-list/vwc-list-item';
import '@vonage/vwc-button';

export default class Home extends Element {
	async getHtml() {
		return html`
      <vwc-select label="filled">
        <vwc-list-item></vwc-list-item>
        <vwc-list-item value="0">Item 0</vwc-list-item>
        <vwc-list-item value="1">Item 1</vwc-list-item>
        <vwc-list-item value="2">Item 2</vwc-list-item>
        <vwc-list-item value="3">Item 3</vwc-list-item>
        <vwc-list-item noninteractive>
          <vwc-button raised style="cursor: inherit; pointer-events: auto;">Click me</vwc-button>
        </vwc-list-item>
      </vwc-select>
    `;
	};
}
