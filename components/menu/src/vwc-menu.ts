import '@vonage/vvd-core';
import { Menu as MwcMenu } from '@material/mwc-menu/mwc-menu';
// import { style } from '@material/mwc-menu/mwc-menu-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-menu': Menu;
  }
}

@customElement('vwc-menu')
export class Menu extends MwcMenu {
  // static get styles() {
  //   // return [super.styles /*, theme*/];
  //   return [style /*, theme*/];
  // }
}
