import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-chips/vwc-chip';
import '@vonage/vwc-chips/vwc-chip-set';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Simple set</h3>
      <vwc-chip-set>
        <vwc-chip label="Chip"></vwc-chip>
        <vwc-chip label="Leading Icon" icon="fingerprint"></vwc-chip>
      </vwc-chip-set>

      <h3>Choice</h3>
      <vwc-chip-set type="choice">
        <vwc-chip label="A"></vwc-chip>
        <vwc-chip label="B" icon="fingerprint"></vwc-chip>
        <vwc-chip label="C" icon="language"></vwc-chip>
      </vwc-chip-set>

      <h3>Filter</h3>
      <vwc-chip-set type="filter">
        <vwc-chip label="1"></vwc-chip>
        <vwc-chip label="2" icon="fingerprint"></vwc-chip>
        <vwc-chip label="3" icon="language"></vwc-chip>
      </vwc-chip-set>

      <h3>Input</h3>
      <vwc-chip-set type="input">
        <vwc-chip label="Foo" removable></vwc-chip>
        <vwc-chip label="Bar" removable removeiconfocusable></vwc-chip>
      </vwc-chip-set>
    `;
  }
}
