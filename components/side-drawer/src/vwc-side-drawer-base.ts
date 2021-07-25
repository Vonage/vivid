import {
	html, LitElement, TemplateResult
} from 'lit-element';

export class VWCSideDrawerBase extends LitElement {
	protected render(): TemplateResult {
		return html`<div class="side-drawer">
						<slot></slot>
					</div>`;
	}
}
