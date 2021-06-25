import '@vonage/vvd-core';
import {
	customElement, html, LitElement, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar.css';
import {
	assertIsValidDateStringRepresentation,
	getValidDateString,
	getFirstDateOfTheWeek
} from './vwc-calendar-date-functions';
import {	DirectiveFn } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-calendar': VWCCalendar;
	}
}

/**
 * Represents a calendar custom element.
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
	 * Accepts any valid date string representation
	 * @example
	 * 2021-01-01
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
	 * @example
	 * en-US | en-US, he-IL
	 *
	 * @public
	 * */
	@property({
		reflect: false,
		converter: {
			toAttribute(v) {
				// console.log(Array.isArray(v));
				console.log(v);
				return v;
			},
			fromAttribute(v) {
				console.log(v);
				return v;
			}
		}
	})
	locales = 'en-US';

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
			<div role="grid">
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
