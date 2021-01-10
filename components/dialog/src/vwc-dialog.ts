import { customElement, LitElement, property } from 'lit-element';
import { style as vwcDialogStyle } from './vwc-dialog.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-dialog': VwcDialog;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
VwcDialog.styles = [vwcDialogStyle];

/**
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 * Our button supports native features like the 'form' and 'type' attributes
 */
@customElement('vwc-dialog')
export class VwcDialog extends LitElement {
	@property({ type: Boolean, reflect: true })
	enlarged = false;

	@property({ attribute: 'some-attribute', reflect: true })
	someAttribute = null;

	protected updated(changes: Map<string, boolean>): void {
		super.updated();
	}

	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
	}
}
