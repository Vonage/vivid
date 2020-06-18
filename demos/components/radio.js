import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-radio';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Default</h3>
      <vwc-radio name="myGroup" value="value1"></vwc-radio>
      <vwc-radio name="myGroup" value="value2" checked></vwc-radio>
    `;
  }
}
