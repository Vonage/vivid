import '@vonage/vvd-core';
import { ListItem as MwcListItem } from '@material/mwc-list/mwc-list-item';
// import { style } from '@material/mwc-list/mwc-list-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-list-item': ListItem;
  }
}

@customElement('vwc-list-item')
export class ListItem extends MwcListItem {
  // static get styles() {
  //   // return [super.styles /*, theme*/];
  //   return [style /*, theme*/];
  // }
}
