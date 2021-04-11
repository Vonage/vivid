import { customElement, html, LitElement, property, PropertyValues } from 'lit-element';
import { style } from './vwc-toggle-button-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-toggle-button-group': VwcToggleButtonGroup;
	}
}

export const VALID_BUTTON_ELEMENTS = ['vwc-button', 'vwc-icon-button'];
const SELECTED_EVENT_NAME = 'selected';
const SELECTED_ATTRIBUTE_NAME = 'selected';
const MULTIPLE_ATTRIBUTE_NAME = 'multi';
const GROUP_BUTTON_ATTRIBUTE = 'group-button';

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
		buttonElement.setAttribute(SELECTED_ATTRIBUTE_NAME, 'true');
	}
}

@customElement('vwc-toggle-button-group')
export class VwcToggleButtonGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;
	@property({
		attribute: MULTIPLE_ATTRIBUTE_NAME,
		type: Boolean,
		reflect: true
	})
	multi = false;

	constructor() {
		super();
		this.setNodesAndClickEvents(this.items);
	}

	#_items: Element[] | null = null;

	get items(): Element[] {
		return this.#_items ? this.#_items : (this.#_items = [...this.children].filter(child => isValidButton(child)));
	}

	get selected() {
		return this.items.filter(button => isButtonActive(button));
	}

	get values() {
		return [...new Set(
			this.items
				.map(child => isButtonActive(child) ? child.getAttribute('value') : false)
				.filter(value => value !== false))];
	}

	set values(values: (string | false | null)[]) {
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

	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
		let slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
		slot.addEventListener('slotchange', () => {
			let nodes = slot.assignedElements()
				.filter(node => (isValidButton(node) && !this.items.includes(node)));
			this.setNodesAndClickEvents(nodes);
			this.#_items = null;
			this.items;
		});
	};

	protected render(): unknown {
		return html`
			<slot></slot>`;
	}

	private setNodesAndClickEvents(nodes: Element[]) {
		nodes.forEach((buttonElement) => {
			buttonElement.setAttribute(GROUP_BUTTON_ATTRIBUTE, '');
			buttonElement.addEventListener('click', () => {
				if (!this.multi) {
					this.clearSelection(buttonElement);
				}
				toggleButton(buttonElement);
				this.dispatchToggleEvent();
			});
		});
	}

	private clearSelection(buttonElement?: Element) {
		this.items.forEach(button => {
			if (button === buttonElement) return;
			button.removeAttribute(SELECTED_ATTRIBUTE_NAME);
		});
	}

	private dispatchToggleEvent() {
		this.dispatchEvent(new Event(SELECTED_EVENT_NAME));
	}

}
