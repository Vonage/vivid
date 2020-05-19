import '@vonage/vvd-core';
import { customElement, html, LitElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { style } from './mwc-chip.css.js';
import { nothing } from 'lit-html';

@customElement('vwc-chip')
export class VWCChip extends LitElement {
  @property({type: String}) label = '';
  @property({type: String}) icon = '';
  @property({type: Boolean}) selected = false;
  @property({type: Boolean}) removable = false;
  @property({type: String}) removeIcon = 'close';
  
  static styles = style;
  
  render() {
    const classes = {
      'mdc-chip--selected': this.selected,
      'mdc-chip--deletable': this.removable
    };

    return html`
      <div class="mdc-chip ${classMap(classes)}" role="row">
        <div class="mdc-chip__ripple"></div>
        ${this.renderIcon()}
        <span role="gridcell">
          <span role="button" tabindex="0" class="mdc-chip__primary-action">
            <span class="mdc-chip__text">${this.label}</span>
          </span>
        </span>
        ${this.renderRemoveIcon()}
      </div>
    `;
  }

  protected renderIcon() {
    const icon = html`${this.icon ? html`
      <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">${this.icon}</i>` : nothing}`;

    return icon;
  }

  protected renderRemoveIcon() {
    const icon = html`${this.removable ? html`
      <i class="mdc-chip__icon mdc-chip__icon--trailing material-icons">${this.removeIcon}</i>` : nothing}`;

    return icon;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-chip': VWCChip;
  }
}
