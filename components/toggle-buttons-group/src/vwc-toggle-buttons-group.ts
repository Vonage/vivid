import { customElement, LitElement, property } from 'lit-element';
import { style } from './vwc-toggle-buttons-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-toggle-buttons-group': VwcToggleButtonsGroup;
	}
}

@customElement('vwc-toggle-buttons-group')
export class VwcToggleButtonsGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	@property({ attribute: 'some-attribute', reflect: true })
	someAttribute = null;

	protected updated(changes: Map<string, boolean>): void {
		super.updated();
	}

	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
	}
}
