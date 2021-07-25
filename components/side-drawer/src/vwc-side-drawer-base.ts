import {
	html, LitElement, TemplateResult
} from 'lit-element';
export class VWCSideDrawerBase extends LitElement {
	protected render(): TemplateResult {
		return html`
			<div class="side-drawer" part=${this.hasAttribute('vvd-scheme-alternate') ? '' : 'vvd-scheme-alternate'}>
				<slot></slot>
			</div>`;
	}
}
