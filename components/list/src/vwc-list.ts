import '@vonage/vvd-core';
import { List as MwcList } from '@material/mwc-list/mwc-list';
// import { style } from '@material/mwc-list/mwc-list-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-list': List;
  }
}

@customElement('vwc-list')
export class List extends MwcList {
  // static get styles() {
  //   // return [super.styles /*, theme*/];
  //   return [style /*, theme*/];
  // }
}
