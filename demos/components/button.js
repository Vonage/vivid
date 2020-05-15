import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-button';

export default class Home extends Element {
  async getHtml() {
    return html`
      <vwc-button>Default Button</vwc-button>
      <vwc-button raised>Raised Button</vwc-button>
      <vwc-button outlined icon="code">Outlined Button</vwc-button>
    `;
  }
}
