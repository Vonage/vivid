import '@vonage/vvd-core';
import {
	customElement, html, LitElement, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar-event.css';
import { styleMap } from 'lit-html/directives/style-map';

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
	 * @prop the heading of the event
	 * @public
	 * */
	@property({ type: String, reflect: false })
	heading?: string;

	/**
	 * @prop the description of the event
	 * @public
	 * */
	@property({ type: String, reflect: false })
	description?: string;

	/**
	 * @prop color - color of event card
	 * @public
	 * */
	@property({ type: String, reflect: false })
	color?: string;

	/**
	 * @prop sets card display precendence and indentation
	 * @public
	 * */
	@property({ type: String, reflect: false, attribute: 'overlap-count' })
	overlapCount?: string;

	/**
	 * @prop start - time of day event starts
	 * @public
	 * */
	@property({ type: Number, reflect: false })
	start = 0; // TODO should be converted to allowed range

	/**
	 * @prop duration - event's time duration in hours
	 * @public
	 * */
	@property({ type: Number, reflect: false })
	duration = 1; // TODO should be converted to allowed range

	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		const styles = {
			...this.color && { '--vvd-calendar-event--primary-color': this.color },
			...this.overlapCount && { '--vvd-calendar-event--overlap-count': this.overlapCount },
			'--vvd-calendar-event--start': (this.start).toString(),
			'--vvd-calendar-event--duration': (this.duration).toString(),
		};
		return html`
			<section
			role="button"
			tabindex="0"
			style="${styleMap(styles)}"
			>
				<h2><strong>${this.heading}</strong></h2>
				<p>${this.description}</p>
			</section>
		`;
	}
}


