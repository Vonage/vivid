import {
	customElement,
	LitElement,
	CSSResult,
} from 'lit-element';
import { style } from './vwc-frame.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-frame': VWCFrame;
	}
}

const FRAME_STYLE_ID = 'vwc-frame-style-id'

/**
 * Vivid context providing component
 */
@customElement('vwc-frame')
export class VWCFrame extends LitElement {
	static get styles(): CSSResult[] {
		return [style];
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	connectedCallback() {
		super.connectedCallback();
		this.ensureStylesApplied();
	}

	private ensureStylesApplied() {
		VWCFrame.styles.forEach((style, index) => {
			const tmpId = `${FRAME_STYLE_ID}-${index}`;
			if (!document.head.querySelector(`#${tmpId}`)) {
				const cs = document.createElement('style');
				cs.id = tmpId;
				cs.type = 'text/css';
				cs.innerHTML = style.cssText;
				document.head.appendChild(cs);
			}
		});
	}
}
