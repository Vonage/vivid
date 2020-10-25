import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Dialog as MwcDialog } from '@material/mwc-dialog';
import { style as mwcDialogStyle } from '@material/mwc-dialog/mwc-dialog-css.js';
import { style as vwcDialogStyle } from './vwc-dialog.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-dialog': VwcDialog;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MwcDialog.styles = [mwcDialogStyle, vwcDialogStyle];

/**
 * This component is an extension of [<mwc-dialog>](https://github.com/material-components/material-components-web-components/tree/master/packages/dialog)
 */
@customElement('vwc-dialog')
export class VwcDialog extends MwcDialog {
	protected updated(changes: Map<string, boolean>): void {
		super.updated(changes);
	}

	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
	}
}
