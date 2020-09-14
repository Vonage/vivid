import { customElement } from 'lit-element';
import { NotchedOutline as MWCNotchedOutline } from '@material/mwc-notched-outline';
import { style as mwcNotchedOutlineStyle } from '@material/mwc-notched-outline/mwc-notched-outline-css.js';
import { style as vwcNotchedOutlineStyle } from './vwc-notched-outline.css';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-notched-outline': VWCNotchedOutline;
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCNotchedOutline.styles = [mwcNotchedOutlineStyle, vwcNotchedOutlineStyle];

/**
 * This component is an extension of [<mwc-notched-outline>](https://github.com/material-components/material-components-web-components/tree/master/packages/notched-outline)
 * This component is NOT meant to be used itself, but serves as an adjustment/definition for the usage of it in other components
 */
@customElement('vwc-notched-outline')
export class VWCNotchedOutline extends MWCNotchedOutline {}
