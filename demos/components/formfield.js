import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-formfield';
import '@vonage/vwc-checkbox';

export default class Home extends Element {
  async getHtml() {
    return html`
      <vwc-formfield outlined label="Vwc formfield around checkbox">
        <vwc-checkbox></vwc-checkbox>
      </vwc-formfield>

      <mwc-formfield label="Vwc formfield around radio">
        <mwc-radio name="myGroup" value="value1"></mwc-radio>
      </mwc-formfield>
    `;
  }
}
