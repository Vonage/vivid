import '@vonage/vvd-core';
import {
	customElement,
	html,
	property,
	LitElement,
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
	#internalInput: HTMLInputElement = VWCUpload.createInternalInput();

	static styles = [style];

	@property({ type: String, reflect: true })
	accept = '';

	@property({ type: Boolean, reflect: true })
	multiple = false;

	@property({ type: String, reflect: true })
	'aria-controls' = 'fileupload';

	@property({ type: String, reflect: true })
	buttonText = 'Upload';

	@property({ type: String, reflect: true })
	label = '';

	connectedCallback(): void {
		super.connectedCallback();
		this.appendChild(this.#internalInput);
	}

	get files(): FileList | null {
		return this.#internalInput.files;
	}

	triggerFileInput(): void {
		this.#internalInput?.click();
	}

	protected updated(
		changedProperties: Map<string | number | symbol, unknown>
	): void {
		super.update(changedProperties);
		if (changedProperties.has('accept')) {
			this.#internalInput.setAttribute('accept', this.accept);
		}
		if (changedProperties.has('multiple')) {
			if (this.multiple) {
				this.#internalInput.setAttribute('multiple', '');
			} else {
				this.#internalInput.removeAttribute('multiple');
			}
		}
	}

	protected render(): TemplateResult {
		return html`
			<label>
				${this.renderDragNDropSurface()} ${this.renderLabel()}
				${this.renderButton()}
				<slot name="${INTERNAL_INPUT_SLOT_NAME}"></slot>
				${this.renderHelper()}
			</label>
		`;
	}

	private static createInternalInput() {
		const result = document.createElement('input');
		result.type = 'file';
		return result;
	}

	private renderLabel(): TemplateResult {
		let result;
		if (this.label) {
			result = html`<span class="vwc-upload-label">${this.label}</span>`;
		} else {
			result = html``;
		}
		return result;
	}

	private renderButton(): TemplateResult {
		return html`
			<vwc-button
				class="vwc-upload-button"
				@click=${this.triggerFileInput}
				layout="filled"
				connotation="primary"
			>
				<slot></slot>${this.buttonText}</vwc-button
			>
		`;
	}

	private renderHelper(): TemplateResult {
		return html``;
	}

	private renderDragNDropSurface(): TemplateResult {
		return html``;
	}
}
