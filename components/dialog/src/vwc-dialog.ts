import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Dialog as MWCDialog } from '@material/mwc-dialog';
import { style as vwcDialogStyle } from './vwc-dialog.css';
import { style as mwcDialogStyle } from '@material/mwc-dialog/mwc-dialog-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-dialog': VWCDialog;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCDialog.styles = [styleCoupling, mwcDialogStyle, vwcDialogStyle];

/**
 * This component is an extension of [<mwc-dialog>](https://github.com/material-components/material-components-web-components/tree/master/packages/dialog)
 */
@customElement('vwc-dialog')
export class VWCDialog extends MWCDialog {}
