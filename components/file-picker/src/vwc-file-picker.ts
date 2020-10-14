import '@vonage/vvd-core';
import '@vonage/vwc-button';
import {
	customElement,
	html,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-file-picker.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-file-picker': VWCFilePicker;
	}
}

const INTERNAL_INPUT_SLOT_NAME = 'internal-input';

@customElement('vwc-file-picker')
export class VWCFilePicker extends LitElement {
	#internalInput: HTMLInputElement = VWCFilePicker.createInternalInput();

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
	buttonText = 'Add file';

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
		if (['accept', 'form', 'name'].includes(name) && newval !== null) {
			this.#internalInput.setAttribute(name, newval);
		} else if (name === 'multiple') {
			if (newval === 'false' || newval === null) {
				this.#internalInput.removeAttribute('multiple');
			} else {
				this.#internalInput.setAttribute('multiple', '');
			}
		}
		super.attributeChangedCallback(name, oldval, newval);
	}

	get files(): FileList | null {
		return this.#internalInput.files;
	}

	get value(): string | null {
		return this.#internalInput.value;
	}

	get form(): HTMLFormElement | null {
		return this.#internalInput.form;
	}

	set form(_: HTMLFormElement | null) {
		//	do nothing, as a native element does
	}

	triggerFileInput(): void {
		this.#internalInput?.click();
	}

	protected render(): TemplateResult {
		return html`
			<label>
				${this.renderLabel()} ${this.renderDragNDropSurface()}
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
				icon="upload"
				trailingIcon
				layout="filled"
				connotation="primary"
				@click=${this.triggerFileInput}
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
