import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-radio';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Default</h3>
      <vwc-radio name="myGroupA" value="value1"></vwc-radio>
      <vwc-radio name="myGroupA" value="value2" checked></vwc-radio>
      
      <h3>Disabled</h3>
      <vwc-radio name="myGroupB" value="value1" disabled></vwc-radio>
      <vwc-radio name="myGroupB" value="value2" disabled checked></vwc-radio>
    `;
  }
}
