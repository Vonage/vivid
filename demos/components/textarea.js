import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-textarea';

export default class Home extends Element {
  async getHtml() {
    return html`
      <vwc-textarea outlined label="Vwc textarea"></vwc-textarea>
    `;
  }
}
