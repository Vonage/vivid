import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-textfield';

export default class Home extends Element {
  async getHtml() {
    return html`
      <vwc-textfield outlined label="My Textfield"></vwc-textfield>
    `;
  }
}
