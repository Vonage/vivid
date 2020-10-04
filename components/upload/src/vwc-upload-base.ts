import { html, LitElement, property, query, TemplateResult } from 'lit-element';
import { spreadProps } from '@open-wc/lit-helpers';

export class UploadBase extends LitElement {
	@property({ type: String, reflect: false })
	accept?: string;

	@property({ type: Boolean, reflect: false })
	multiple?: boolean;

	@property({ type: String, reflect: false })
	capture?: string;

	@property({ type: String, reflect: false })
	label?: string;

	@query('input[type="file"]')
	_fileInput!: HTMLInputElement;

	@query('input[type="file"]')
	button!: HTMLInputElement;

	/**
	 * @property {FileList} files - A FileList object that lists every selected file. This list has no more than one member unless the multiple attribute is specified
	 */
	get files(): FileList | null {
		console.log(this._fileInput);
		return this._fileInput.files;
	}

	renderLabel() {
		return html`<label for="fileInput">${this.label}</label>`;
	}

	protected render(): TemplateResult {
		return html`
			<input
				type="file"
				id="fileInput"
				name="fileInput"
				...="${spreadProps({ accept: this.accept, multiple: this.multiple })}"
			/>
			${this.label && this.renderLabel()}
			<vwc-button
				connotation="primary"
				layout="filled"
				@click=${() => this._fileInput.click()}
				>Upload</vwc-button
			>
		`;
	}
}
