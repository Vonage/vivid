import { customElement, LitElement } from 'lit-element';
import { style } from './vwc-elevation.css';
import { property } from 'lit-element/lib/decorators';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-elevation': VWCElevation;
	}
}

@customElement('vwc-elevation')
export class VWCElevation extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	@property({ type: Number })
	dp = 2;

	@property({ type: String, attribute: 'background-color' })
	backgroundColor: string | null = null;

	@property({ type: String, attribute: 'border-radius' })
	borderRadius: string | null = null;
}
