import {
	customElement, html, LitElement, property,
} from 'lit-element';
import type { PropertyValues } from 'lit-element';
import { style } from './vwc-button-toggle-group.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button-toggle-group': VWCButtonToggleGroup;
	}
}


export const VALID_BUTTON_ELEMENTS = ['vwc-button', 'vwc-icon-button'];
const SELECTED_EVENT_NAME = 'selected';
const SELECTED_ATTRIBUTE_NAME = 'selected';
const MULTIPLE_ATTRIBUTE_NAME = 'multi';

function isValidButton(buttonElement: Element) {
	return VALID_BUTTON_ELEMENTS.includes(buttonElement.tagName.toLowerCase());
}

function isButtonActive(buttonElement: Element) {
	return buttonElement.hasAttribute(SELECTED_ATTRIBUTE_NAME);
}

@customElement('vwc-button-toggle-group')
export class VWCButtonToggleGroup extends LitElement {
	/**
	 * @internal
	 */
	static override styles = style;
	@property({
		attribute: MULTIPLE_ATTRIBUTE_NAME,
		type: Boolean,
		reflect: true
	})
		multi = false;

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
		required = false;

	@property({
		type: Boolean,
		reflect: true
	})
		disabled = false;

	constructor() {
		super();
		this.setNodesAndClickEvents(this.items);
	}

	#_items: Element[] | null = null;
	#_values: (string | false | null)[] = [];
	get items(): Element[] {
		return this.#_items ? this.#_items : (this.#_items = [...this.children].filter(child => isValidButton(child)));
	}

	get selected(): Element[] {
		return this.items.filter(button => isButtonActive(button));
	}

	get values(): (string | false | null)[] {
		return [...new Set(
			this.items
				.map(child => (isButtonActive(child) ? child.getAttribute('value') : false))
				.filter(value => value !== false)
		)];
	}

	set values(values: (string | false | null)[]) {
		function isButtonSelectedWithoutValue(button: Element) {
			return !button.hasAttribute('value') && button.hasAttribute(SELECTED_ATTRIBUTE_NAME);
		}

		function isButtonWithDefinedValue(button: Element) {
			return button.hasAttribute('value') && values?.includes(button.getAttribute('value'));
		}

		if (!this.multi) {
			values = [values[0]];
		}
		this.#_values = values;

		this.items.forEach((button) => {
			this.toggleButtonSelectedState(button,
				isButtonSelectedWithoutValue(button) || isButtonWithDefinedValue(button));
		});
	}

	private get size() {
		return {
			dense: this.hasAttribute('dense'),
			enlarged: this.hasAttribute('enlarged'),
			noSize: !this.hasAttribute('dense') && !this.hasAttribute('enlarged')
		};
	}

	protected override updated(changes: Map<string, boolean>): void {
		if (changes.has('dense')) {
			if (this.dense && this.enlarged) {
				this.enlarged = false;
			}
			this.updateComplete.then(() => this.items?.forEach(buttonElement => this.setVwcButtonSize(buttonElement)));
		}

		if (changes.has('enlarged')) {
			if (this.enlarged && this.dense) {
				this.dense = false;
			}
			this.updateComplete.then(() => this.items?.forEach(buttonElement => this.setVwcButtonSize(buttonElement)));
		}

		if (changes.has('disabled')) {
			this.toggleChildrenDisabledState();
		}
	}

	protected override firstUpdated(_changedProperties: PropertyValues): void {
		super.firstUpdated(_changedProperties);
		const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
		slot.addEventListener('slotchange', () => {
			const nodes = slot.assignedElements()
				.filter(node => (isValidButton(node) && !this.items.includes(node)));
			this.setNodesAndClickEvents(nodes);
			this.#_items = null;
			this.values = [...new Set([...this.#_values, ...this.values])];
		});
	}

	protected override render(): unknown {
		return html`
			<div class="button-toggle-group"><slot></slot></div>`;
	}

	private toggleChildrenDisabledState() {
		this.items.forEach(item => this.toggleChildDisabledState(item));
	}

	private toggleChildDisabledState(item: Element) {
		item.toggleAttribute('disabled', this.disabled);
	}

	private setNodesAndClickEvents(nodes: Element[]) {
		nodes.forEach(buttonElement => this.setNodeAndClickEvent(buttonElement));
	}

	private isButtonValidForToggle(buttonElement: Element) {
		return !this.required || this.selected.length > 1 ||
			(this.required && !isButtonActive(buttonElement));
	}

	private setNodeAndClickEvent(buttonElement: Element) {
		this.setVwcButtonSize(buttonElement);

		this.setNodeAttributes(buttonElement);

		buttonElement.addEventListener('click', () => {
			this.handleButtonClick(buttonElement);
		});
	}

	private handleButtonClick(buttonElement: Element) {
		if (!this.multi) {
			this.clearSelection(buttonElement);
		}
		if (this.isButtonValidForToggle(buttonElement)) {
			this.toggleButtonSelectedState(buttonElement, !isButtonActive(buttonElement));
			this.dispatchToggleEvent();
		}
	}

	private setNodeAttributes(buttonElement: Element) {
		this.toggleButtonSelectedState(buttonElement, isButtonActive(buttonElement));
		this.toggleChildDisabledState(buttonElement);
	}

	private toggleButtonSelectedState(buttonElement: Element, isSelected: boolean) {
		if (isSelected) {
			buttonElement.setAttribute('layout', 'filled');
			buttonElement.toggleAttribute(SELECTED_ATTRIBUTE_NAME, true);
		} else {
			buttonElement.removeAttribute('layout');
			buttonElement.toggleAttribute(SELECTED_ATTRIBUTE_NAME, false);
		}
	}

	private setVwcButtonSize(buttonElement: Element) {
		const size = this.size;

		if (size.dense) {
			buttonElement.setAttribute('dense', '');
			buttonElement.removeAttribute('enlarged');
		}

		if (size.enlarged) {
			buttonElement.setAttribute('enlarged', '');
			buttonElement.removeAttribute('dense');
		}

		if (size.noSize) {
			buttonElement.removeAttribute('dense');
			buttonElement.removeAttribute('enlarged');
		}
	}

	private clearSelection(buttonElement?: Element) {
		this.items.forEach((button) => {
			if (button === buttonElement) return;
			this.toggleButtonSelectedState(button, false);
		});
	}

	private dispatchToggleEvent() {
		this.dispatchEvent(new Event(SELECTED_EVENT_NAME));
	}
}
