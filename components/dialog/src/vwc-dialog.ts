import { customElement, property, PropertyValues } from 'lit-element';
import { style } from './vwc-dialog.css';
import { Dialog as MWCDialog } from '@material/mwc-dialog';
import { style as mwcDialogStyle } from '@material/mwc-dialog/mwc-dialog-css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import '@vonage/vvd-core';
import { ariaProperty } from '@material/mwc-base/aria-property';

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
	@property({
		attribute: 'close-button',
		type: Boolean,
		reflect: true
	})
	closeButton?: boolean;

	@ariaProperty
	@property({
		attribute: 'aria-live',
		type: String,
	})
	ariaLive?:string;

	protected firstUpdated() {
		super.firstUpdated();
		this.addDismissButton();
	}

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

	private addDismissButton() {
		const closeButtonWrapper = document.createElement('div');
		closeButtonWrapper.innerHTML = `<vwc-icon-button
								class="dismiss-button"
								icon="close-line"
								dense></vwc-icon-button>`;
		const closeButton = closeButtonWrapper.children[0];
		closeButton.addEventListener('click', () => {
			this.close();
		});
		this.shadowRoot?.querySelector('.mdc-dialog__surface')
			?.appendChild(closeButton);
	}
}
