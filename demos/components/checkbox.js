import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-checkbox';

export default class Home extends Element {
  async getHtml() {
    return html`
      <mwc-checkbox></mwc-checkbox>
      <mwc-checkbox checked></mwc-checkbox>
			<mwc-checkbox indeterminate></mwc-checkbox>
			<hr>
      <mwc-checkbox disabled></mwc-checkbox>
      <mwc-checkbox disabled checked></mwc-checkbox>
      <mwc-checkbox disabled indeterminate></mwc-checkbox>
    `;
  }
}
