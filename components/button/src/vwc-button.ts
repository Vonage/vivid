import { ButtonBase as MwcButtonBase } from '@material/mwc-button/mwc-button-base';
import { style } from '@material/mwc-button/mwc-button-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

@customElement('vwc-button')
export class Button extends MwcButtonBase {
  static get styles() {
    // return [super.styles /*, theme*/];
    return [style /*, theme*/];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': Button;
  }
}
