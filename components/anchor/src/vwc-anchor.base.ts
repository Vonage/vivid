import { html, LitElement, TemplateResult } from 'lit-element';

export class AnchorBase extends LitElement {
	protected createRenderRoot(): ShadowRoot {
		return this.attachShadow({ mode: 'open', delegatesFocus: true });
	}

	protected render(): TemplateResult {
		return html` <button>lorem ipsum</button> `;
	}
}
