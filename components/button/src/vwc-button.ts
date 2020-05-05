import '@vonage/vvd-core';
import { Button as MwcButton } from '@material/mwc-button/mwc-button';
// import { style } from '@material/mwc-button/mwc-button-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': Button;
  }
}

@customElement('vwc-button')
export class Button extends MwcButton {
  // static get styles() {
  //   // return [super.styles /*, theme*/];
  //   return [style /*, theme*/];
  // }
}
