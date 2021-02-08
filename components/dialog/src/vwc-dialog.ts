import { customElement, property, PropertyValues } from 'lit-element';
import { style } from './vwc-dialog.css';
import { Dialog as MWCDialog } from '@material/mwc-dialog';
import { style as mwcDialogStyle } from '@material/mwc-dialog/mwc-dialog-css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';
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
MWCDialog.styles = [styleCoupling, mwcDialogStyle, style];


function modalMode(context: VWCDialog, value: unknown): void {
	const contentElement = context.renderRoot.querySelector('.mdc-dialog__scrim');
	if (contentElement) {
		value
			? context.scrimClickAction = 'closed'
			: context.scrimClickAction = '';
	}
}

function hideActions(context: VWCDialog, value: unknown): void {
	const contentElement = context.renderRoot.querySelector('#content');
	if (contentElement) {
		value
			? contentElement.classList.remove('last')
			: contentElement.classList.add('last');
	}
}

const PROPERTIES_CHANGE_HANDLERS: {[key: string]: unknown} = {
	modalMode,
	hideActions
};

@customElement('vwc-dialog')
export class VWCDialog extends MWCDialog {
	@property({ type: Boolean, reflect: true })
	modalMode = false;

	protected updated(_changedProperties: PropertyValues): void {
		super.updated(_changedProperties);
		if (!this.renderRoot.querySelector('#dialog_icon')) {
			this.renderRoot
				.querySelector('.mdc-dialog__surface')
				?.prepend(iconTemplate.content.cloneNode(true));
		}

		_changedProperties.forEach((value: any, key) => {
			const cb = PROPERTIES_CHANGE_HANDLERS[key as string];
			cb &&
				(cb as (context: VWCDialog, value: unknown) => void) (this, value);
		});
	}
}
