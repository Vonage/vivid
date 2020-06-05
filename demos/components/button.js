import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-button';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Unelevated</h3>
      <vwc-button unelevated>Unelevated</vwc-button>
      <vwc-button unelevated icon="code">Unelevated</vwc-button>
      
      <h3>Outlined</h3>
      <vwc-button outlined>Outlined</vwc-button>
      <vwc-button outlined icon="code">Outlined</vwc-button>

      <h3>Disabled</h3>
      <vwc-button disabled unelevated icon="code">Disabled</vwc-button>
      <vwc-button disabled outlined icon="code">Disabled</vwc-button>
    `;
  }
}
