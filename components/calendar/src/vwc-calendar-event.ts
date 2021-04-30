import '@vonage/vvd-core';
import {
	customElement, html, LitElement, property, TemplateResult, unsafeCSS
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
	 * @prop the label of the event
	 * @public
	 * */
	@property({ type: String, reflect: true })
	label?: string;

	/**
	 * @prop day - day of the week (starts from 0)
	 * @public
	 * */
	@property({ type: Number, reflect: true })
	day?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		return html`
			<section
				role="button"
				tabindex="0"
				style="--vvd-calendar-event-event-day: ${unsafeCSS(this.day)}"
			>
				<label>${this.label}</label>
			</section>
		`;
	}
}


