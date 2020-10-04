import { html, LitElement, property, query, TemplateResult } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

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

	get files(): FileList | null {
		return this._fileInput.files;
	}

	renderLabel(): TemplateResult {
		return html`<label for="fileInput">${this.label}</label>`;
	}

	protected render(): TemplateResult {
		return html`
			${this.label && this.renderLabel()}
			<input
				type="file"
				id="fileInput"
				name="fileInput"
				...="${spread({ accept: this.accept, multiple: this.multiple })}"
			/>
			<vwc-button
				connotation="primary"
				layout="filled"
				@click=${() => this._fileInput.click()}
				>Upload</vwc-button
			>
		`;
	}
}
