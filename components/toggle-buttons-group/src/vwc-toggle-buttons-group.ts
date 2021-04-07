import { customElement, html, LitElement, property } from 'lit-element';
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

	constructor() {
		super();
		this.items.forEach((buttonElement) => {
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
		return [...this.children].filter(child => isValidButton(child));
	}

	protected render(): unknown {
		return html`
			<slot></slot>`;
	}

	private dispatchToggleEvent() {
		this.dispatchEvent(new Event(SELECTED_EVENT_NAME));
	}
}
