import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-radio';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Default</h3>
      <mwc-radio name="myGroupA" value="value1"></mwc-radio>
      <mwc-radio name="myGroupA" value="value2" checked></mwc-radio>
      
      <h3>Disabled</h3>
      <mwc-radio name="myGroupB" value="value1" disabled></mwc-radio>
      <mwc-radio name="myGroupB" value="value2" disabled checked></mwc-radio>
    `;
  }
}
