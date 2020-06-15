import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-textfield';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Outlined</h3>
      <vwc-textfield outlined label="My Textfield"></vwc-textfield>

      <h3>Disabled</h3>
      <vwc-textfield disabled outlined label="My Textfield"></vwc-textfield>
    `;
  }
}
