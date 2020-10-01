import { html, LitElement, query, TemplateResult } from 'lit-element';
import '@vonage/vwc-button';

export class UploadBase extends LitElement {
	@query('input[type="file"]')
	_fileInput!: HTMLInputElement;

	test() {
		console.log(this._fileInput);
		this._fileInput.click();
	}

	protected render(): TemplateResult {
		return html`
			<label for="file">Choose file to upload</label>
			<input type="file" id="file" name="file" multiple />
			<vwc-button layout="outlined" @click="${this.test.bind(this)}"
				><slot></slot
			></vwc-button>
		`;
	}
}
