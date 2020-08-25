import {
	customElement,
	LitElement,
	CSSResult,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-frame': VWCFrame;
	}
}

/**
 * Vivid context providing component
 */
@customElement('vwc-frame')
export class VWCFrame extends LitElement {
	static get styles(): CSSResult[] {
		return [];
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}
}
