import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-checkbox';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Default</h3>
      <vwc-checkbox></vwc-checkbox>
      <vwc-checkbox checked></vwc-checkbox>
			<vwc-checkbox indeterminate></vwc-checkbox>
      
      <h3>Disabled</h3>
      <vwc-checkbox disabled></vwc-checkbox>
      <vwc-checkbox disabled checked></vwc-checkbox>
      <vwc-checkbox disabled indeterminate></vwc-checkbox>
    `;
  }
}
