import { customElement } from 'lit-element';
import { style } from './vwc-dialog.css';
import { Dialog as MwcDialog } from '@material/mwc-dialog'
import { style as mwcDialogStyle } from '@material/mwc-dialog/mwc-dialog-css';
import { Button as MWCButton } from '@material/mwc-button';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-dialog': VwcDialog;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCButton.styles = [styleCoupling, mwcDialogStyle, style];

@customElement('vwc-dialog')
export class VwcDialog extends MwcDialog {

	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
	}
}
