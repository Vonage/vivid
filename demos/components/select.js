import { html } from 'lit-html';
import Element from '../modules/Element.js';
import '@vonage/vwc-select';
import '@vonage/vwc-list/vwc-list-item';

export default class Home extends Element {
  async getHtml() {
    return html`
      <vwc-select label="filled">
        <mwc-list-item></mwc-list-item>
        <mwc-list-item value="0">Item 0</mwc-list-item>
        <mwc-list-item value="1">Item 1</mwc-list-item>
        <mwc-list-item value="2">Item 2</mwc-list-item>
        <mwc-list-item value="3">Item 3</mwc-list-item>
      </vwc-select>
    `;
  }
}
