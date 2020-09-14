import { customElement } from 'lit-element';
import { Radio as MWCRadio } from '@material/mwc-radio';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcRadioStyle } from './vwc-radio.css';
import { style as mwcRadioStyle } from '@material/mwc-radio/mwc-radio-css.js';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-radio': VWCRadio;
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCRadio.styles = [styleCoupling, mwcRadioStyle, vwcRadioStyle];

/**
 * This component is an extension of [<mwc-radio>](https://github.com/material-components/material-components-web-components/tree/master/packages/radio)
 */
@customElement('vwc-radio')
export class VWCRadio extends MWCRadio {}
