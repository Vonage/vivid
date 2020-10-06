import {
	html,
	LitElement,
	property,
	query,
	queryAssignedNodes,
	TemplateResult,
} from 'lit-element';

let instanceIndex = 1;

export class UploadBase extends LitElement {
	@property({ type: String }) label?: string;

	@queryAssignedNodes('fileInput', false, 'input[type="file"]')
	_fileInputNodes?: NodeListOf<HTMLInputElement>;

	@query('label') _label?: HTMLLabelElement;

	get _fileInput(): HTMLInputElement {
		const fileInputNodes = this._fileInputNodes || [];
		return fileInputNodes[0];
	}

	ensureInputId(fileInput: HTMLInputElement): void {
		if (!fileInput.hasAttribute('id')) {
			const id = `vvd-file-input${instanceIndex++}`;
			fileInput.id = id;
		}
		const id = fileInput.getAttribute('id') || '';
		this._label?.setAttribute('for', id);
	}

	// TODO: slot change fires only if contains content and will not fire upon first initialization of component with no content
	handleFileInputSlotchange(): void {
		const fileInputNodes = this._fileInputNodes || [];

		this.validateFileInput(fileInputNodes);

		const [fileInput] = fileInputNodes;
		this.ensureInputId(fileInput);
	}

	private validateFileInput(
		fileInputNodes: NodeListOf<HTMLInputElement> | never[]
	) {
		const { length } = fileInputNodes;

		if (length < 1) {
			throw new Error('at least one input of type "file" required');
		}
		if (length > 1) {
			throw new Error('there can\'t be moer than one input of type "file"');
		}
	}

	updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('label') && this._fileInput && this.label) {
			this._fileInput.setAttribute('aria-label', this.label);
		}
	}

	renderLabel(): TemplateResult {
		return html`<label @click=${() => this._fileInput.click()}
			>${this.label}</label
		>`;
	}

	protected render(): TemplateResult {
		return html`
			${this.label && this.renderLabel()}
			<slot name="fileInput" @slotchange=${this.handleFileInputSlotchange}></slot>
			<button @click=${() => this._fileInput.click()}>Upload</button>
		`;
	}
}
