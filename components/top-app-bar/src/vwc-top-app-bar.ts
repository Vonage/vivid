import { init as coreInit } from '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TopAppBar as MWCTopAppBar } from '@material/mwc-top-app-bar';
import { style as MWCTopAppBarStyle } from '@material/mwc-top-app-bar/mwc-top-app-bar-css.js';
import { style as VWCTopAppBarStyle } from './vwc-top-app-bar.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-top-app-bar-fixed': VWCTopAppBar;
  }
}

coreInit();

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTopAppBar.styles = [styleCoupling, MWCTopAppBarStyle, VWCTopAppBarStyle];

/**
 * This component is an extension of [<mwc-top-app-bar-fixed>](https://github.com/material-components/material-components-web-components/tree/master/packages/top-app-bar-fixed)
 */
@customElement('vwc-top-app-bar')
export class VWCTopAppBar extends MWCTopAppBar {}
