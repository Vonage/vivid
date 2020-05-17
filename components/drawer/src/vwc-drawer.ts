import '@vonage/vvd-core';
import { DrawerBase } from '@material/mwc-drawer/mwc-drawer-base';
import { style } from '@material/mwc-drawer/mwc-drawer-css.js';
import { customElement } from 'lit-element';

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
@customElement('mwc-drawer')
export class Drawer extends DrawerBase {
  static styles = style;
}

@customElement('vwc-drawer')
export class VWCDrawer extends Drawer {}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-drawer': VWCDrawer;
  }
}
