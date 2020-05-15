import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-checkbox';

export default class Home extends Element {
  async getHtml() {
    return html`
      <vwc-checkbox></vwc-checkbox>
    `;
  }
}
