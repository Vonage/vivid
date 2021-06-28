import '@vonage/vvd-core';
import {
	customElement,
	html,
	LitElement,
	property,
	TemplateResult
} from 'lit-element';
import { DirectiveFn } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { style } from './vwc-calendar.css';
import {
	assertIsValidDateStringRepresentation,
	getValidDateString,
	getFirstDateOfTheWeek
} from './vwc-calendar-date-functions';
import { VWCCalendarEvent } from './vwc-calendar-event';

const isCellOrHeader = (el: unknown): el is HTMLElement => el instanceof HTMLElement
	&& (
		el.matches('[role="gridcell"i]')
		|| el.matches('[role="columnheader"i]')
	);

function nextCellOrHeader(this: VWCCalendar, key: string, activeElement: HTMLElement) {
	const toggleRowQuery = (f: HTMLElement) => (f.matches('[role="columnheader"i]')
		? '[role="gridcell"i]'
		: '[role="columnheader"i]');
	switch (key) {
	case 'ArrowRight':
		return activeElement.nextElementSibling || activeElement.parentNode?.firstElementChild;
	case 'ArrowLeft':
		return activeElement.previousElementSibling || activeElement.parentElement?.lastElementChild;
	case 'ArrowUp':
	case 'ArrowDown': {
		const { children } = activeElement?.parentElement as HTMLElement;
		const i = Array.from(children).indexOf(activeElement);
		return this.shadowRoot?.querySelector(`${toggleRowQuery(activeElement as HTMLElement)}:nth-child(${i + 1})`);
	}
	default:
		return null;
	}
}
declare global {
	interface HTMLElementTagNameMap {
		'vwc-calendar': VWCCalendar;
	}
}

/**
 * Represents a calendar custom element.
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

	#daysLength = 7;
	#hours = (Array.from({ length: 23 }) as Date[])
		.fill(new Date(new Date().setHours(0, 0, 0)))
		.map((d, i) => new Date(d.setHours(++i)))

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
			focusNext = nextCellOrHeader.call(this, event.key, activeElement);
		} else if (this.focusedCalendarEvent) {
			focusNext = this.getCalendarEventContainingCell(this.focusedCalendarEvent);
		} else {
			// default first selectable element
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
		const isArrow = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key);
		isArrow
			&& this?.arrowKeysInteractions
			&& this.arrowKeysInteractions(event);
	}

	protected renderTimeRows(): DirectiveFn {
		const length = this.#hours.length + 1;

		return repeat(
			Array.from({ length }),
			() => html`<div role="listitem"></div>`
		);
	}

	protected renderColumns(): DirectiveFn {
		const length = this.#daysLength;

		return repeat(
			Array.from({ length }),
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
					<time datetime=${getValidDateString(date)} aria-readonly="true"
						aria-label=${new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(date)}>
						<h2>
							<em>
								${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}
							</em>
							<small>
								${new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)}
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
					<time datetime="${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(h)}">
						${new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(h)}
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
