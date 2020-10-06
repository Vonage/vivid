import '@vonage/vvd-core';
import {
	customElement,
	html,
	LitElement,
	query,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-upload.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-upload': VWCUpload;
	}
}

const INTERNAL_INPUT_SLOT_NAME = 'internal-input';

@customElement('vwc-upload')
export class VWCUpload extends LitElement {
	static styles = [style];

	#internalInput: HTMLInputElement = VWCUpload.createInternalInput();

	@query('label') _label?: HTMLLabelElement;

	connectedCallback(): void {
		super.connectedCallback();
		this.appendChild(this.#internalInput);
	}

	triggerFileInput(): void {
		this.#internalInput?.click();
	}

	protected render(): TemplateResult {
		return html`
			<slot name="${INTERNAL_INPUT_SLOT_NAME}"></slot>
			${this.renderDragNDropSurface()}
			<vwc-button
				@click=${this.triggerFileInput}
				layout="filled"
				connotation="primary"
				><slot></slot
			></vwc-button>
		`;
	}

	private static createInternalInput() {
		const result = document.createElement('input');
		result.type = 'file';
		return result;
	}

	private renderDragNDropSurface(): TemplateResult {
		return html``;
	}
}
