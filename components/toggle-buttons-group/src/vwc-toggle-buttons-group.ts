import { customElement, html, LitElement, property, PropertyValues } from 'lit-element';
import { style } from './vwc-toggle-buttons-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-toggle-buttons-group': VwcToggleButtonsGroup;
	}
}

export const VALID_BUTTON_ELEMENTS = ['vwc-button'];
const SELECTED_EVENT_NAME = 'selected';
const SELECTED_ATTRIBUTE_NAME = 'selected';
const MULTIPLE_ATTRIBUTE_NAME = 'multi';

function isValidButton(buttonElement: Element) {
	return VALID_BUTTON_ELEMENTS.includes(buttonElement.tagName.toLowerCase());
}

function isButtonActive(buttonElement: Element) {
	return buttonElement.hasAttribute(SELECTED_ATTRIBUTE_NAME);
}

function toggleButton(buttonElement: Element) {
	if (isButtonActive(buttonElement)) {
		buttonElement.removeAttribute(SELECTED_ATTRIBUTE_NAME);
	} else {
		buttonElement.setAttribute(SELECTED_ATTRIBUTE_NAME, '');
	}
}

@customElement('vwc-toggle-buttons-group')
export class VwcToggleButtonsGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	#_items: Element[] | null = null;

	@property({ attribute: MULTIPLE_ATTRIBUTE_NAME, type: Boolean, reflect: true })
	multi = false;

	get selected() {
		return this.items.filter(button => isButtonActive(button));
	}

	get values() {
		return [...new Set(
			this.items
				.map(child => isButtonActive(child) ? child.getAttribute('value') : false)
				.filter(value => value !== false))];
	}

	set values(values: (string|false|null)[]) {
		this.clearSelection();
		if (!this.multi) {
			values = [values[0]];
		}
		this.items.forEach(child => {
			values.includes(child.getAttribute('value')) ?
				child.setAttribute(SELECTED_ATTRIBUTE_NAME, '') :
				child.removeAttribute(SELECTED_ATTRIBUTE_NAME);
		});
	}

	get items(): Element[] {
		return this.#_items ? this.#_items : (this.#_items = [...this.children].filter(child => isValidButton(child)));
	}

	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
		let slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
		slot.addEventListener('slotchange', () => {
			let nodes = slot.assignedElements().filter(node => (isValidButton(node) && !this.items.includes(node)));
			this.setNodesClickEvents(nodes);
			this.#_items = null;
			this.items;
		});
	};

	private setNodesClickEvents(nodes: Element[]) {
		nodes.forEach((buttonElement) => {
			buttonElement.addEventListener('click', () => {
				if (!this.multi) {
					this.clearSelection(buttonElement);
				}
				toggleButton(buttonElement);
				this.dispatchToggleEvent();
				(buttonElement.shadowRoot?.activeElement as HTMLElement)?.blur();
			});
		});
	}

	private clearSelection(buttonElement?: Element) {
		this.items.forEach(button => {
			if (button === buttonElement) return;
			button.removeAttribute(SELECTED_ATTRIBUTE_NAME);
		});
	}

	protected render(): unknown {
		return html`
			<slot></slot>`;
	}

	private dispatchToggleEvent() {
		this.dispatchEvent(new Event(SELECTED_EVENT_NAME));
	}

	constructor() {
		super();
		this.setNodesClickEvents(this.items);
	}

}
