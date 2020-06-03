import '@vonage/vvd-core';
import { customElement, LitElement, html, TemplateResult, CSSResult } from 'lit-element';
import { style } from './vwc-app.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-app': App;
	}
}

@customElement('vwc-app')
export class App extends LitElement {
	static get styles(): Array<CSSResult> {
		// return [super.styles /*, theme*/];
		return [
			style,
			/*, theme*/
		];
	}

	render(): TemplateResult {
		return html`
      <slot></slot>
    `;
	}
}
