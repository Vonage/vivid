import '@vonage/vvd-core';
import '@vonage/vwc-button';
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

	@property({ attribute: 'form', reflect: true })
	formId = null;

	@property({ type: Boolean, reflect: true })
	multiple = false;

	@property({ type: String, reflect: true })
	name = '';

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

	attributeChangedCallback(
		name: string,
		oldval: string | null,
		newval: string | null
	): void {
		if (name === 'form' && newval && newval !== oldval) {
			this.#internalInput.setAttribute('form', newval);
		} else {
			super.attributeChangedCallback(name, oldval, newval);
		}
	}

	get files(): FileList | null {
		return this.#internalInput.files;
	}

	get form(): HTMLFormElement | null {
		return this.#internalInput.form;
	}

	set form(_: HTMLFormElement | null) {
		//	do nothing, as a native element does
	}

	get value(): string | null {
		return this.#internalInput.value;
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
		if (changedProperties.has('name')) {
			this.#internalInput.setAttribute('name', this.name);
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
		result.slot = INTERNAL_INPUT_SLOT_NAME;
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
