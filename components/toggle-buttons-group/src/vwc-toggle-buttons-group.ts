import { customElement, LitElement } from 'lit-element';
import { style } from './vwc-toggle-buttons-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-toggle-buttons-group': VwcToggleButtonsGroup;
	}
}

export const VALID_BUTTON_ELEMENTS = ['vwc-button'];

@customElement('vwc-toggle-buttons-group')
export class VwcToggleButtonsGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	#_selected: null | number = null

	constructor() {
		super();
		[...this.children].forEach((buttonElement, activeIndex) => {
			if (!VALID_BUTTON_ELEMENTS.includes(buttonElement.tagName.toLowerCase())) return;
			buttonElement.addEventListener('click', () => {
				if (this.#_selected === activeIndex) {
					this.#_selected = null;
				} else {
					this.#_selected = activeIndex
				}
				this.dispatchEvent(new CustomEvent('toggle', {
					detail: {
						toggled: {
							activeIndex,
							state: this.#_selected === activeIndex
						}
					}
				}));
			});
		});
	}
}
