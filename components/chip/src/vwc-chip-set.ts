import '@vonage/vvd-core';
import { customElement, html, LitElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { style } from './mwc-chip.css.js'; // split to mwc-chip-set

@customElement('vwc-chip-set')
export class VWCChipSet extends LitElement {
  @property({type: String}) type = '';

  static styles = style;

  render() {
    const classes = {
      'mdc-chip-set--choice': this.type === 'choice',
      'mdc-chip-set--filter': this.type === 'filter',
      'mdc-chip-set--input': this.type === 'input'
    };

    return html`
      <div class="mdc-chip-set ${classMap(classes)}" role="grid">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-chip-set': VWCChipSet;
  }
}
