import { html } from 'lit-html';
import Element from '../modules/Element.js';
import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';

export default class Home extends Element {
  async getHtml() {
    return html`
      <vwc-list>
        <mwc-list-item>Item 0</mwc-list-item>
        <mwc-list-item>Item 1</mwc-list-item>
        <mwc-list-item>Item 2</mwc-list-item>
        <mwc-list-item>Item 3</mwc-list-item>
      </vwc-list>
    `;
  }
}
