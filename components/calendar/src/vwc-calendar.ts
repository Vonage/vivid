import '@vonage/vvd-core';
import {
	customElement,
	html,
	LitElement,
	property,
	TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar.css';
import {
	assertIsValidDateStringRepresentation,
	getValidDateString,
	getFirstDateOfTheWeek
} from './vwc-calendar-date-functions';
import { VWCCalendarEvent } from './vwc-calendar-event';
import {
	ARROW_DOWN,
	ARROW_LEFT,
	ARROW_RIGHT,
	ARROW_UP,
	getHeaderDescendantGridCell,
	isCellOrHeader,
	getNextFocusableGridElement,
} from './vwc-calendar-keyboard-interactions.js';
import { getEventContext } from './vwc-calendar-event-context.js';

export const TotalHours = 24;

declare global {
	interface HTMLElementTagNameMap {
		'vwc-calendar': VWCCalendar;
	}
}

/**
 * Represents a calendar custom element.
 *
 * @cssprop [--vvd-calendar-shape=6px] defines the calendar and its events shape (border radius)
 *
 * @alpha
 */
@customElement('vwc-calendar')
export class VWCCalendar extends LitElement {
	/**
	 * assign styles
	 * @internal
	 * */
	static styles = [style];

	/**
	 * The date within a week of choice.
	 * Accepts any valid date string representation e.g. _2021-01-01_
	 * @public
	 * */
	@property({
		reflect: true,
		converter: {
			toAttribute(v) {
				// throw if not a valid date string representation
				assertIsValidDateStringRepresentation(v);
				return v;
			},
			fromAttribute(v) {
				// throw if not a valid date string representation
				assertIsValidDateStringRepresentation(v);
				return new Date(v);
			}
		}
	})
	datetime?: Date;

	/**
	 * A locale string or array of locale strings that contain one or more language or locale tags.
	 * If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale.
	 * If you omit this parameter, the default locale of the JavaScript runtime is used.
	 * This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
	 * e.g. en-US | en-US, he-IL
	 *
	 * @public
	 * */
	@property({
		reflect: true,
		type: String
	})
	locales?: string | string[] | undefined;

	#daysLength = 7;
	#hours = (Array.from({ length: TotalHours - 1 }) as Date[])
		.fill(new Date(new Date().setHours(0, 0, 0)))
		.map((d, i) => new Date(d.setHours(++i)))

	/**
   * Fire an event
   * @param {string} event        - event name
   * @param {Object} [detail={}]  - optional event detail object
   * @returns {boolean}           - return true
   */
	getEventContext = getEventContext.bind(this);


	private getDaysArr(dateArr: Date[]): Date[] {
		if (dateArr.length == this.#daysLength) { return dateArr; }
		const lastDate = new Date(dateArr[dateArr.length - 1]);
		lastDate.setDate(lastDate.getDate() + 1);
		const concatenatedDateArr = [...dateArr, lastDate];
		return this.getDaysArr(concatenatedDateArr);
	}

	private get focusedCalendarEvent(): VWCCalendarEvent | null {
		return (document.activeElement?.matches('vwc-calendar-event') && document.activeElement as VWCCalendarEvent) || null;
	}

	private getCalendarEventContainingCell(calendarEvent: VWCCalendarEvent) {
		const daySlot = calendarEvent.getAttribute('slot');
		const slot = this.shadowRoot?.querySelector(`slot[name="${daySlot}"i]`);
		return slot?.parentElement;
	}

	private arrowKeysInteractions(event: KeyboardEvent) {
		const activeElement = this.shadowRoot?.activeElement;
		let focusNext: Element | null | undefined;

		if (isCellOrHeader(activeElement)) {
			focusNext = getNextFocusableGridElement.call(this, event.key, activeElement);
		} else if (this.focusedCalendarEvent) {
			focusNext = this.getCalendarEventContainingCell(this.focusedCalendarEvent);
		} else if (activeElement?.matches('em[role="button"i]')) {
			focusNext = getHeaderDescendantGridCell.call(this, event.key, activeElement as HTMLElement);
		} else {
			// default selectable element (first header)
			focusNext = this.shadowRoot?.querySelector('[role="columnheader"i]');
		}

		this.moveTo(focusNext as HTMLElement);

		event.preventDefault();
	}

	private moveTo(el: HTMLElement | null | undefined) {
		const onBlur = ({ target }: FocusEvent) => (target as HTMLElement)?.setAttribute('tabindex', '-1');

		el?.addEventListener('blur', onBlur, { once: true });
		el?.setAttribute('tabindex', '0');
		el?.focus();
	}

	private onKeydown(event: KeyboardEvent) {
		const isArrow = [ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT].includes(event.key);
		isArrow	&& this.arrowKeysInteractions(event);
	}

	protected renderTimeRows(): TemplateResult<1>[] {
		const length = this.#hours.length + 1;

		return Array.from({ length }).map(
			() => html`<div role="listitem"></div>`
		);
	}

	protected renderColumns(): TemplateResult<1>[] {
		const length = this.#daysLength;

		return Array.from({ length }).map(
			(_, i) => html`
				<div role="gridcell" tabindex="-1">
					<slot name="day-${i}"></slot>
				</div>
			`
		);
	}

	/**
	 * The html days markup
	 * @internal
	 * */
	protected renderDays(): TemplateResult {
		return html`
			<div class="column-headers" role="row">
				${this.getDaysArr([getFirstDateOfTheWeek(this.datetime)]).map(date => html`
				<div role="columnheader" tabindex="-1">
					<time datetime=${getValidDateString(date)} aria-readonly="true">
						<h2>
							<!-- TODO add to column aria-labelledby or describedby to count events and related day e.g. "3 events, Sunday, March 8" -->
							<em tabindex="0" role="button" aria-label=${new Intl.DateTimeFormat(this.locales, { weekday: 'long', month: 'long', day: 'numeric' }).format(date)}>
								${new Intl.DateTimeFormat(this.locales, { day: '2-digit' }).format(date)}
							</em>
							<small aria-hidden="true">
								${new Intl.DateTimeFormat(this.locales, { weekday: 'short' }).format(date)}
							</small>
						</h2>
					</time>
				</div>`)}
			</div>`;
	}

	/**
	 * the html days markup
	 * @internal
	 * */
	protected renderHours(): TemplateResult {
		return html`
			<div class="row-headers" role="presentation">
				${this.#hours.map(h => html`<span role="rowheader">
					<time datetime="${new Intl.DateTimeFormat(this.locales, { hour: 'numeric', minute: 'numeric', hour12: false }).format(h)}">
						${new Intl.DateTimeFormat(this.locales, { hour: 'numeric', hour12: true }).format(h)}
					</time>
				</span>`)}
			</div>`;
	}

	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		return html`
			<div role="grid" @keydown=${this.onKeydown}>
				${this.renderDays()}
				<div class="calendar-row" role="row">
					${this.renderHours()}
					<div class="calendar-grid-presentation" role="presentation">
						<div class="hours" role="list">
							${this.renderTimeRows()}
						</div>
						<div class="columns" role="presentation">
							${this.renderColumns()}
						</div>
						<slot></slot>
					</div>
				</div>
			</div>
		`;
	}
}
