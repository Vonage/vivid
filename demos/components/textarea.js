import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-textarea';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Outlined</h3>
      <vwc-textarea outlined label="My textarea"></vwc-textarea>
      
      <h3>Disabled</h3>
      <vwc-textarea disabled outlined label="My textarea"></vwc-textarea>
      
      <h3>Required</h3>
      <vwc-textarea required outlined label="My textarea"></vwc-textarea>
    `;
  }
}
