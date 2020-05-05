import '@vonage/vvd-core';
import { Switch as MwcSwitch } from '@material/mwc-switch/mwc-switch';
// import { style } from '@material/mwc-switch/mwc-switch-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-switch': Switch;
  }
}

@customElement('vwc-switch')
export class Switch extends MwcSwitch {
  // static get styles() {
  //   // return [super.styles /*, theme*/];
  //   return [style /*, theme*/];
  // }
}
