import '@vonage/vvd-core';
import { customElement, html, LitElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { style } from './mwc-chip.css.js';

@customElement('vwc-chip')
export class VWCChip extends LitElement {
  @property({type: String}) label = '';

  @property({type: String}) icon = '';

  @property({type: Boolean}) selected = false;
  
  static styles = style;
  
  render() {
    const classes = {
      'mdc-chip--selected': this.selected,
    };

    return html`
      <div class="mdc-chip ${classMap(classes)}" role="row">
        <div class="mdc-chip__ripple"></div>
        ${this.icon ? this.renderIcon() : ''}
        <span role="gridcell">
          <span role="button" tabindex="0" class="mdc-chip__primary-action">
            <span class="mdc-chip__text">${this.label}</span>
          </span>
        </span>
      </div>
    `;
  }

  protected renderIcon() {
    return html`
      <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">${this.icon}</i>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-chip': VWCChip;
  }
}
