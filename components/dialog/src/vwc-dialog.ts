import { customElement, property } from 'lit-element';
import type { PropertyValues } from 'lit-element';
import { style } from './vwc-dialog.css.js';
import { Dialog as MWCDialog } from '@material/mwc-dialog';
import { styles as mwcDialogStyles } from '@material/mwc-dialog/mwc-dialog.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import '@vonage/vvd-core';

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
MWCDialog.styles = [styleCoupling, mwcDialogStyles, style];

@customElement('vwc-dialog')
export class VWCDialog extends MWCDialog {
	@property({
		attribute: 'close-button',
		type: Boolean,
		reflect: true
	})
		closeButton?: boolean;

	@property({
		attribute: 'topPosition',
		type: Boolean,
		reflect: true
	})
		topPosition?: boolean;

	protected override firstUpdated() {
		super.firstUpdated();
		this.addDismissButton();
	}

	protected override updated(_changedProperties: PropertyValues): void {
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
