import '@vonage/vvd-core';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { style } from '@material/mwc-menu/mwc-menu-css.js';
import { customElement } from 'lit-element';

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
@customElement('mwc-menu')
export class Menu extends MenuBase {
  static styles = style;
}

@customElement('vwc-menu')
export class VWCMenu extends Menu {}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-menu': VWCMenu;
  }
}
