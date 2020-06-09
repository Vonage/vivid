import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-linear-progress';

export default class Home extends Element {
  async getHtml() {
    return html`
    <vwc-linear-progress
      size="small"
      progress="0.5"
      buffer="0.75">
    </vwc-linear-progress>
    <hr>
    <vwc-linear-progress size="small" indeterminate></vwc-linear-progress>
    `;
  }
}