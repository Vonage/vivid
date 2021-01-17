import { customElement } from 'lit-element';
import { style } from './vwc-dialog.css';
import { Dialog as MWCDialog } from '@material/mwc-dialog';
import { style as mwcDialogStyle } from '@material/mwc-dialog/mwc-dialog-css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-dialog': VWCDialog;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
VWCDialog.styles = [styleCoupling, mwcDialogStyle, style];

@customElement('vwc-dialog')
export class VWCDialog extends MWCDialog {
	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
	}
}
