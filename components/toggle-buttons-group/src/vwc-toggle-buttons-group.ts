import { customElement, html, LitElement } from 'lit-element';
import { style } from './vwc-toggle-buttons-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-toggle-buttons-group': VwcToggleButtonsGroup;
	}
}

export const VALID_BUTTON_ELEMENTS = ['vwc-button'];
const SELECTED_EVENT_NAME = 'selected';
const SELECTED_ATTRIBUTE_NAME = 'selected';

function isValidButton(buttonElement: Element) {
	return !VALID_BUTTON_ELEMENTS.includes(buttonElement.tagName.toLowerCase());
}

function isButtonActive(buttonElement: Element) {
	return buttonElement.hasAttribute(SELECTED_ATTRIBUTE_NAME);
}

@customElement('vwc-toggle-buttons-group')
export class VwcToggleButtonsGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	constructor() {
		super();
		[...this.children].forEach((buttonElement) => {
			if (isValidButton(buttonElement)) return;
			buttonElement.addEventListener('click', () => {
				[...this.children].forEach(button => {
					if (button === buttonElement) return;
					button.removeAttribute(SELECTED_ATTRIBUTE_NAME);
				});
				if (isButtonActive(buttonElement)) {
					buttonElement.removeAttribute(SELECTED_ATTRIBUTE_NAME);
				} else {
					buttonElement.setAttribute(SELECTED_ATTRIBUTE_NAME, '');
				}
				this.dispatchToggleEvent();
			});
		});
	}

	get values() {
		return [...new Set(
			[...this.children]
				.map(child => isButtonActive(child) ? child.getAttribute('value') : false)
				.filter(value => value !== false))];
	}



	protected render(): unknown {
		return html`
			<slot></slot>`;
	}

	private dispatchToggleEvent() {
		this.dispatchEvent(new Event(SELECTED_EVENT_NAME));
	}
}
