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

	@property({ type: String, reflect: true })
	helper = '';

	connectedCallback(): void {
		super.connectedCallback();
		this.appendChild(this.#internalInput);
	}

	protected firstUpdated(): void {
		this.setupDragNDrop();
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
			<label class="wrapper">
				${this.renderHeader()}
				<div class="content part">
					${this.renderDragNDropSurface()} ${this.renderButton()}
					<slot name="${INTERNAL_INPUT_SLOT_NAME}"></slot>
				</div>
				${this.renderFooter()}
			</label>
		`;
	}

	private static createInternalInput() {
		const result = document.createElement('input');
		result.type = 'file';
		result.slot = INTERNAL_INPUT_SLOT_NAME;
		return result;
	}

	private renderHeader(): TemplateResult {
		if (this.label) {
			return html`<span class="label part">${this.label}</span>`;
		} else {
			return html``;
		}
	}

	private renderButton(): TemplateResult {
		return html`
			<vwc-button
				class="button"
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

	private renderFooter(): TemplateResult {
		if (this.helper) {
			return html`
				<div class="footer part">
					<span class="helper">${this.helper}</span>
				</div>
			`;
		} else {
			return html``;
		}
	}

	private renderDragNDropSurface(): TemplateResult {
		return html``;
	}

	private setupDragNDrop() {
		const dropZone = this.shadowRoot?.querySelector('.content') as HTMLElement;
		if (dropZone) {
			dropZone.ondragover = (e) => {
				e.preventDefault();
			};
			dropZone.addEventListener('drop', (e) => {
				e.preventDefault();
				if (e.dataTransfer?.files && e.dataTransfer.files.length) {
					//	TODO: filter out files?
					this.#internalInput.files = e.dataTransfer.files;
					//	TODO: trigger change event?
				} else {
					console.error('this component allows only a file/s drop');
				}
			});
		} else {
			console.error('failed to setup drop zone');
		}
	}
}
