import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-chips/vwc-chip';
import '@vonage/vwc-chips/vwc-chip-set';

export default class Home extends Element {
  async getHtml() {
    return html`
      <h3>Small</h3>
      <vwc-chip-set>
        <vwc-chip label="Chip" theme="black" size="small"></vwc-chip>
        <vwc-chip label="Chip" theme="blue" size="small"></vwc-chip>
        <vwc-chip label="Chip" theme="green" size="small"></vwc-chip>
        <vwc-chip label="Chip" theme="indigo" size="small"></vwc-chip>
        <vwc-chip label="Chip" theme="orange" size="small"></vwc-chip>
        <vwc-chip label="Chip" theme="purple" size="small"></vwc-chip>
        <vwc-chip label="Chip" theme="red" size="small"></vwc-chip>
        <vwc-chip label="Chip" theme="yellow" size="small"></vwc-chip>
      </vwc-chip-set>

      <h3>Default</h3>
      <vwc-chip-set>
        <vwc-chip label="Chip" theme="black"></vwc-chip>
        <vwc-chip label="Chip" theme="blue"></vwc-chip>
        <vwc-chip label="Chip" theme="green"></vwc-chip>
        <vwc-chip label="Chip" theme="indigo"></vwc-chip>
        <vwc-chip label="Chip" theme="orange"></vwc-chip>
        <vwc-chip label="Chip" theme="purple"></vwc-chip>
        <vwc-chip label="Chip" theme="red"></vwc-chip>
        <vwc-chip label="Chip" theme="yellow"></vwc-chip>
      </vwc-chip-set>

      <h3>Large</h3>
      <vwc-chip-set>
        <vwc-chip label="Chip" theme="black" size="large"></vwc-chip>
        <vwc-chip label="Chip" theme="blue" size="large"></vwc-chip>
        <vwc-chip label="Chip" theme="green" size="large"></vwc-chip>
        <vwc-chip label="Chip" theme="indigo" size="large"></vwc-chip>
        <vwc-chip label="Chip" theme="orange" size="large"></vwc-chip>
        <vwc-chip label="Chip" theme="purple" size="large"></vwc-chip>
        <vwc-chip label="Chip" theme="red" size="large"></vwc-chip>
        <vwc-chip label="Chip" theme="yellow" size="large"></vwc-chip>
      </vwc-chip-set>

      <h3>Pill</h3>
      <vwc-chip-set>
        <vwc-chip label="Chip" theme="black" pill></vwc-chip>
        <vwc-chip label="Chip" theme="blue" pill></vwc-chip>
        <vwc-chip label="Chip" theme="green" pill></vwc-chip>
        <vwc-chip label="Chip" theme="indigo" pill></vwc-chip>
        <vwc-chip label="Chip" theme="orange" pill></vwc-chip>
        <vwc-chip label="Chip" theme="purple" pill></vwc-chip>
        <vwc-chip label="Chip" theme="red" pill></vwc-chip>
        <vwc-chip label="Chip" theme="yellow" pill></vwc-chip>
      </vwc-chip-set>
      
      <h3>Transparent</h3>
      <vwc-chip-set>
        <vwc-chip label="Chip" theme="black" transparent></vwc-chip>
        <vwc-chip label="Chip" theme="blue" transparent></vwc-chip>
        <vwc-chip label="Chip" theme="green" transparent></vwc-chip>
        <vwc-chip label="Chip" theme="indigo" transparent></vwc-chip>
        <vwc-chip label="Chip" theme="orange" transparent></vwc-chip>
        <vwc-chip label="Chip" theme="purple" transparent></vwc-chip>
        <vwc-chip label="Chip" theme="red" transparent></vwc-chip>
        <vwc-chip label="Chip" theme="yellow" transparent></vwc-chip>
      </vwc-chip-set>
      
      <h3>Outlined</h3>
      <vwc-chip-set>
        <vwc-chip label="Chip" theme="black" outlined></vwc-chip>
        <vwc-chip label="Chip" theme="blue" outlined></vwc-chip>
        <vwc-chip label="Chip" theme="green" outlined></vwc-chip>
        <vwc-chip label="Chip" theme="indigo" outlined></vwc-chip>
        <vwc-chip label="Chip" theme="orange" outlined></vwc-chip>
        <vwc-chip label="Chip" theme="purple" outlined></vwc-chip>
        <vwc-chip label="Chip" theme="red" outlined></vwc-chip>
        <vwc-chip label="Chip" theme="yellow" outlined></vwc-chip>
      </vwc-chip-set>

      <hr/>
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
