import '@vonage/vvd-core';
import { Drawer as MwcDrawer } from '@material/mwc-drawer/mwc-drawer';
// import { style } from '@material/mwc-drawer/mwc-drawer-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-drawer': Drawer;
  }
}

@customElement('vwc-drawer')
export class Drawer extends MwcDrawer {
  // static get styles() {
  //   // return [super.styles /*, theme*/];
  //   return [style /*, theme*/];
  // }
}
