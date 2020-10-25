import '@vonage/vvd-core';
import '@vonage/vwc-badge';
import '@vonage/vwc-button';
import '@vonage/vwc-icon';
import {
	customElement,
	html,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';
import { style as filePickerStyle } from './vwc-file-picker.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-file-picker': VWCFilePicker;
	}
}

const BUTTON_SLOT = 'button',
	INPUT_FILE_SLOT = 'input-file-slot';

@customElement('vwc-file-picker')
export class VWCFilePicker extends LitElement {
	static styles = [styleCoupling, filePickerStyle];
	#container: HTMLElement | null = null;

	@property({ type: Number, reflect: false })
	private filesCount = 0;

	@property({ type: String, reflect: true })
	label = '';

	@property({ type: String, reflect: true })
	helper = '';

	@property({ type: String, reflect: false })
	validationMessage = '';

	@property({ type: String, reflect: true })
	notAFileError = 'only file/s drop allowed';

	@property({ type: String, reflect: true })
	tooManyFilesError = 'only one file allowed';

	@property({ type: Boolean, reflect: true })
	'drop-zone': true;

	setCustomValidity(message: string): void {
		this.validationMessage = String(message);
		this.#container?.classList[this.validationMessage ? 'add' : 'remove'](
			'invalid'
		);
	}

	protected firstUpdated(): void {
		this.#container = this.shadowRoot?.querySelector('.wrapper') || null;
		this.setupDragNDrop();
		this.shadowRoot
			?.querySelector(`.${INPUT_FILE_SLOT}`)
			?.addEventListener('slotchange', (e) => {
				this.validateSlottedInput(e.target as HTMLSlotElement);
			});
		this.addEventListener('change', () => {
			const fi = this.getActualInput();
			this.filesCount = fi && fi.files ? fi.files.length : 0;
		});
	}

	protected render(): TemplateResult {
		return html`
			<label class="wrapper">
				${this.renderHeader()}
				<div class="content drop-zone part">
					<slot name="dd-hint">${this.renderDragNDropHint()}</slot>
					<slot name="${BUTTON_SLOT}" @click=${this.triggerFileInput}></slot>
					<slot class="${INPUT_FILE_SLOT}"></slot>
					<div class="files-count">
						<vwc-badge connotation="error">5</vwc-badge>
					</div>

					<!-- <vwc-badge class="files-count" connotation="error"
						>${this.filesCount}</vwc-badge
					> -->
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

	private renderFooter(): TemplateResult {
		const text = this.validationMessage || this.helper || '';
		if (text) {
			return html`
				<div class="footer part">
					<vwc-icon class="error-icon" type="info-negative" size="small"></vwc-icon>
					<span class="spacer"></span>
					<span class="text">${text}</span>
				</div>
			`;
		} else {
			return html``;
		}
	}

	private renderDragNDropHint(): TemplateResult {
		return html`<span class="dd-hint">Drag & Drop files here</span>`;
	}

	private setupDragNDrop(): void {
		const ddZone = this.shadowRoot?.querySelector('.content') as HTMLElement;
		if (ddZone) {
			ddZone.ondragover = (e) => e.preventDefault();

			ddZone.addEventListener('dragenter', (e) => {
				e.preventDefault();
				this.#container?.classList.add('drag-over');
				if (!e.dataTransfer) {
					return;
				}

				const dddValidationError = this.validateImportedData(e.dataTransfer);
				if (dddValidationError) {
					this.#container?.classList.add('drag-invalid');
					e.dataTransfer.dropEffect = 'none';
				} else {
					e.dataTransfer.dropEffect = 'copy';
				}
			});

			ddZone.addEventListener('dragleave', (e) => {
				e.preventDefault();
				this.cleanDragClasses();
			});

			ddZone.addEventListener('drop', (e) => {
				e.preventDefault();
				this.cleanDragClasses();
				if (!e.dataTransfer) {
					return;
				}

				const dddValidationError = this.validateImportedData(e.dataTransfer);
				this.setCustomValidity(dddValidationError);
				if (dddValidationError) {
					this.setFiles(null);
				} else {
					this.setFiles(e.dataTransfer.files);
				}
			});
		} else {
			console.error('failed to setup drop zone');
		}
	}

	private triggerFileInput(): void {
		this.setCustomValidity('');
		const fi = this.getActualInput();
		if (fi) {
			fi.click();
		} else {
			console.error('input element missing');
		}
	}

	private setFiles(files: FileList | null): void {
		const fi = this.getActualInput();
		if (fi) {
			if (files && files.length) {
				fi.files = files;
			} else {
				fi.value = '';
			}
			fi.dispatchEvent(
				new Event('change', {
					bubbles: true,
				})
			);
		} else {
			console.error('input element missing');
		}
	}

	private cleanDragClasses(): void {
		if (!this.#container) {
			return;
		}
		const ctr = Array.from(this.#container.classList).filter((c) =>
			c.startsWith('drag-')
		);
		this.#container?.classList.remove(...ctr);
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

	/**
	 * This method validates component readyness for dropping files:
	 * - presence of file input is assured
	 * - file/s drag (and not otherwise) is assured
	 * - file/s cardinality is assured
	 * - TODO: file/s type is assured
	 *
	 * @param {DataTransfer} dataTransfer data transferred
	 */
	private validateImportedData(dataTransfer: DataTransfer): string {
		const fi = this.getActualInput();
		if (!fi) {
			return 'input element missing';
		}

		const ddl = dataTransfer.items;
		if (ddl) {
			if (Array.from(ddl).some((i) => i.kind !== 'file')) {
				return this.notAFileError;
			}
			if (!fi.hasAttribute('multiple') && ddl.length > 1) {
				return this.tooManyFilesError;
			}
			//	TODO: assert file types
		}

		return '';
	}
}
