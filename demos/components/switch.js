import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-switch';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Default</h3>
      <vwc-switch></vwc-switch>
      <vwc-switch checked></vwc-switch>
      
      <h3>Disabled</h3>
      <vwc-switch disabled></vwc-switch>
      <vwc-switch checked disabled></vwc-switch>
    `;
  }
}
