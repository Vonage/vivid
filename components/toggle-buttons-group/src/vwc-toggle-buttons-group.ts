import { customElement, html, LitElement } from 'lit-element';
import { style } from './vwc-toggle-buttons-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-toggle-buttons-group': VwcToggleButtonsGroup;
	}
}

export const VALID_BUTTON_ELEMENTS = ['vwc-button'];
const SELECTED_EVENT_NAME = 'selected';

function isValidButton(buttonElement: Element) {
	return !VALID_BUTTON_ELEMENTS.includes(buttonElement.tagName.toLowerCase());
}

@customElement('vwc-toggle-buttons-group')
export class VwcToggleButtonsGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	#_selected: null | number = null

	isIndexActive(index: number) {
		return this.#_selected === index;
	}

	constructor() {
		super();
		[...this.children].forEach((buttonElement, index) => {
			if (isValidButton(buttonElement)) return;
			buttonElement.addEventListener('click', () => {
				if (this.isIndexActive(index)) {
					this.#_selected = null;
				} else {
					this.#_selected = index
				}
				this.dispatchToggleEvent();
			});
		});
	}

	get groupState() {
		return [...this.children].map((button, index) => {
			return {
				index,
				value: button.getAttribute('value'),
				active: this.isIndexActive(index)
			};
		})
	}

	get values() {
		return [...new Set([...this.children].map(child => child.getAttribute('value')))];
	}
	private dispatchToggleEvent() {
		this.dispatchEvent(new Event(SELECTED_EVENT_NAME));
	}

	protected render(): unknown {
		return html`<slot></slot>`;
	}
}
