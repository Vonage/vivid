import { customElement } from 'lit-element';
import { CheckListItem as MWCCheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { style as mwcListItemStyle } from '@material/mwc-list/mwc-list-item-css.js';
import { style as mwcControlListItemStyle } from '@material/mwc-list/mwc-control-list-item-css.js';
import { style as vwcCheckListItemStyle } from './vwc-check-list-item.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-check-list-item': VWCCheckListItem;
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCheckListItem.styles = [
  styleCoupling,
  mwcListItemStyle,
  mwcControlListItemStyle,
  vwcCheckListItemStyle,
];

/**
 * This component is an extension of [<mwc-check-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-check-list-item')
export class VWCCheckListItem extends MWCCheckListItem {}
