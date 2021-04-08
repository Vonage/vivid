import '@vonage/vvd-core';
import {
	customElement, html, LitElement, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar-event.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-calendar-event': VWCCalendarEvent;
	}
}

/**
 * Represents a calendar custom element.
 * @alpha
 */
@customElement('vwc-calendar-event')
export class VWCCalendarEvent extends LitElement {
	/**
	 * assign styles
	 * @internal
	 * */
	static styles = [style];

	/**
	 * @prop index - day of the week (starts from 0)
	 * @public
	 * */
	@property({ type: Number, reflect: true })
	index?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		return html`
			<section
				role="button"
				tabindex="0"
				style="--event-day: ${this.index}"
			></section>
		`;
	}
}
