import { customElement, PropertyValues } from 'lit-element';
import { style } from './vwc-dialog.css';
import { Dialog as MWCDialog } from '@material/mwc-dialog';
import { style as mwcDialogStyle } from '@material/mwc-dialog/mwc-dialog-css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-dialog': VWCDialog;
	}
}

const iconTemplate = document.createElement('template');
iconTemplate.innerHTML = `
	<div id="dialog_icon">
		<slot name="icon"></slot>
</div>
`;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCDialog.styles = [styleCoupling, mwcDialogStyle, style];

@customElement('vwc-dialog')
export class VWCDialog extends MWCDialog {
	protected updated(_changedProperties: PropertyValues): void {
		super.updated(_changedProperties);
		if (!this.renderRoot.querySelector('#dialog_icon')) {
			this.renderRoot
				.querySelector('.mdc-dialog__surface')
				?.prepend(iconTemplate.content.cloneNode(true));
		}

		if (_changedProperties.has('hideActions')) {
			const contentElement = this.renderRoot.querySelector('#content');
			if (contentElement) {
				_changedProperties.get('hideActions')
					? contentElement.classList.remove('last')
					: contentElement.classList.add('last');
			}
		}
	}

	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
	}
}
