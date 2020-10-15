import '@vonage/vvd-core';
import '@vonage/vwc-icon';
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

const INPUT_FILE_SLOT = 'input-file-slot';

@customElement('vwc-file-picker')
export class VWCFilePicker extends LitElement {
	static styles = [style];

	@property({ type: String, reflect: true })
	label = '';

	@property({ type: String, reflect: true })
	helper = '';

	get files(): FileList | null {
		return this.getActualInput()?.files || null;
	}

	get value(): string | null {
		return this.getActualInput()?.value || null;
	}

	get form(): HTMLFormElement | null {
		return this.getActualInput()?.form || null;
	}

	set form(_: HTMLFormElement | null) {
		//	do nothing, as a native element does
	}

	triggerFileInput(): void {
		const fi = this.getActualInput();
		if (fi) {
			fi.click();
		} else {
			console.error('input element missing');
		}
	}

	protected firstUpdated(): void {
		this.setupDragNDrop();
		this.shadowRoot
			?.querySelector(`.${INPUT_FILE_SLOT}`)
			?.addEventListener('slotchange', (e) => {
				this.validateSlottedInput(e.target as HTMLSlotElement);
			});
	}

	protected render(): TemplateResult {
		return html`
			<label class="wrapper">
				${this.renderHeader()}
				<div class="content part">
					<slot name="dd-hint">${this.renderDragNDropHint()}</slot>
					<slot name="button" @click=${this.triggerFileInput}
						>${this.renderButton()}</slot
					>
					<slot class="${INPUT_FILE_SLOT}"></slot>
				</div>
				${this.renderFooter()}
			</label>
		`;
	}

	private getActualInput(): HTMLInputElement | null {
		return this.querySelector('[type="file"]');
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
				>Add File</vwc-button
			>
		`;
	}

	private renderFooter(): TemplateResult {
		if (this.helper) {
			return html`
				<div class="footer part">
					<vwc-icon class="error-icon" type="info-negative" size="small"></vwc-icon>
					<span class="spacer"></span>
					<span class="helper">${this.helper}</span>
				</div>
			`;
		} else {
			return html``;
		}
	}

	private renderDragNDropHint(): TemplateResult {
		return html` <span class="dd-hint">Drag&Drop files here or</span> `;
	}

	private setupDragNDrop() {
		const dropZone = this.shadowRoot?.querySelector('.content') as HTMLElement;
		if (dropZone) {
			dropZone.ondragover = (e) => {
				e.preventDefault();
			};
			dropZone.addEventListener('drop', (e) => {
				e.preventDefault();
				const fi = this.getActualInput();
				if (!fi) {
					console.error('input element missing');
					return;
				}
				if (!e.dataTransfer?.files || !e.dataTransfer.files.length) {
					console.error('one file/s drop allowed');
					return;
				}
				if (!fi.hasAttribute('multiple') && e.dataTransfer.files.length > 1) {
					console.error('only one file allowed, but many dropped');
					return;
				}

				fi.files = e.dataTransfer.files;
				fi.dispatchEvent(
					new Event('change', {
						bubbles: true,
					})
				);
			});
		} else {
			console.error('failed to setup drop zone');
		}
	}

	/**
	 * This method will validate ONLY the slotted content:
	 * - not more than a single element
	 * - ONLY an input of type 'file'
	 * @param slot actual input slot
	 */
	private validateSlottedInput(slot: HTMLSlotElement): void {
		const assignedElements = slot
			.assignedNodes()
			.filter((n) => n.nodeType === Node.ELEMENT_NODE);
		if (assignedElements.length > 1) {
			console.error(
				`only a single slotted INPUT expected; found ${assignedElements.length}`
			);
		}
		const fic = assignedElements[0] as HTMLElement;
		if (fic.nodeName !== 'INPUT') {
			console.error(`only an INPUT expected; found ${fic.nodeName}`);
		}
		if (fic.getAttribute('type') !== 'file') {
			console.error(
				`only an INPUT of type 'file' expected; found '${fic.getAttribute('type')}'`
			);
		}
	}
}
