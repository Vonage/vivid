import {
	customElement, html, LitElement, property, PropertyValues
} from 'lit-element';
import { style } from './vwc-button-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button-group': VWCButtonGroup;
	}
}

@customElement('vwc-button-group')
export class VWCButtonGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	@property({
		type: Boolean,
		reflect: true
	})
	enlarged = false;

	@property({
		type: Boolean,
		reflect: true
	})
	dense = false;

	@property({
		type: Boolean,
		reflect: true
	})
	raised = false;

	constructor() {
		super();

		this.setChildrenSizes();
	}
	protected render(): unknown {
		return html`
			<slot></slot>`;
	}

	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
		this.updateChildrenAttributes();
	}

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('dense') || changes.has('enlarged')) {
			this.updateChildrenSizes(changes.has('dense'));
		}
		this.updateChildrenAttributes();
	}

	private updateChildrenSizes(denseChanged: boolean) {
		if (this.dense && this.enlarged) {
			this[denseChanged ? 'enlarged' : 'dense'] = false;
		}
		this.updateComplete.then(this.setChildrenSizes());
	}

	private updateChildrenAttributes() {
		const slot = this.shadowRoot?.querySelector('slot');
		const nodes = slot?.assignedElements();
		nodes?.forEach((buttonElement: Element) => {
			buttonElement.setAttribute('layout', 'filled');
		});
	}

	private setChildrenSizes() {
		return () => this.shadowRoot?.querySelector('slot')
			?.assignedElements()
			.forEach((buttonElement: Element) => {
				if (this.hasAttribute('dense')) {
					buttonElement.setAttribute('dense', '');
					buttonElement.removeAttribute('enlarged');
				} else if (this.hasAttribute('enlarged')) {
					buttonElement.setAttribute('enlarged', '');
					buttonElement.removeAttribute('dense');
				} else {
					buttonElement.removeAttribute('dense');
					buttonElement.removeAttribute('enlarged');
				}
			});
	}
}
