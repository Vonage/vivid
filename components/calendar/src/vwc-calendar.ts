import '@vonage/vvd-core';
import {
	customElement, html, LitElement, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar.css';
import {
	assertIsValidDateStringRepresentation,
	getValidDateString
} from './vwc-calendar-date-functions';

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

	#daysLength = 7;
	#hours = (Array.from({ length: 23 }) as Date[])
		.fill(new Date(new Date().setHours(0, 0, 0)))
		.map((d, i) => new Date(d.setHours(++i)))

	/**
	 * generate dates array of days of the week by given date
	 *
	 * @param dateOrDateString - js date object
	 * @internal
	 * */
	// private getWeekdaysByDate(date: Date = new Date()): Date[] {
	// 	let firstDateOfTheWeek = date.getDate() - date.getDay();
	// 	console.log('firstDateOfTheWeek', firstDateOfTheWeek);
	// 	return Array.from(
	// 		{ length: this.#daysLength },
	// 		() => new Date(date.setDate(firstDateOfTheWeek++))
	// 	);
	// }

	private getFirstDateOfTheWeek(dateOrDateString: Date | string = new Date()): Date {
		if (typeof dateOrDateString === 'string') {
			dateOrDateString = new Date(dateOrDateString);
		}
		return new Date(dateOrDateString.setDate(dateOrDateString.getDate() - dateOrDateString.getDay()));
	}

	private getDaysArr(dateArr: Date[]): Date[] {
		if (dateArr.length == this.#daysLength) { return dateArr; }
		const lastDate = new Date(dateArr[dateArr.length - 1]);
		lastDate.setDate(lastDate.getDate() + 1);
		const concatenatedDateArr = [...dateArr, lastDate];
		return this.getDaysArr(concatenatedDateArr);
	}

	/**
	 * Date formatter
	 *
	 * @remarks
	 * Uses IntlDateTimeFormat API
	 *
	 * @param date - js date object
	 * @param options - Intl.DateTimeFormatOptions
	 *
	 * @internal
	 * */
	private formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
		return new Intl.DateTimeFormat('en-US', options).format(date);
	}

	protected renderTimeRows(): TemplateResult[] {
		const templates = [];
		for (let i = 0; i < (this.#hours.length + 1); i++) {
			templates.push(html`<div role="listitem"></div>`);
		}
		return templates;
	}

	protected renderColumns(): TemplateResult[] {
		const templates = [];
		for (let i = 0; i < this.#daysLength; i++) {
			templates.push(html`<div role="gridcell" tabindex="-1"></div>`);
		}
		return templates;
	}

	/**
	 * The html days markup
	 * @internal
	 * */
	protected renderDays(): TemplateResult {
		return html`
			<ol class="headline" role="row">
					${this.getDaysArr([this.getFirstDateOfTheWeek(this.datetime)]).map(date => html`
					<li role="columnheader" aria-labelledby=${date.getTime()}>
						<h2 role="presentation">
							<span id=${date.getTime()} role="link" tabindex="0" aria-label=${this.formatDate(date, {	weekday: 'long', month: 'long', day: 'numeric' })}>
								<time datetime=${getValidDateString(date)}>
									<em role="presentation">
										${this.formatDate(date, { day: '2-digit' })}
									</em>
									<small role="presentation">
										${this.formatDate(date, {	weekday: 'short' })}
									</small>
								</time>
							</span>
						</h2>
					</li>`)}
			</ol>`;
	}

	/**
	 * the html days markup
	 * @internal
	 * */
	protected renderHours(): TemplateResult {
		return html`
			<ol class="time" role="row">
				${this.#hours.map(h => html`<li role="rowheader">
					<time datetime="${this.formatDate(h, { hour: 'numeric', minute: 'numeric', hour12: false })}">
						${this.formatDate(h, { hour: 'numeric', hour12: true })}
					</time>
				</li>`)}
			</ol>`;
	}

	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		return html`
			<div class="container" role="grid">
				${this.renderDays()}
				${this.renderHours()}
				<div class="calendar" role="presentation">
					<div class="rows" aria-hidden="true" role="list">
						${this.renderTimeRows()}
					</div>
					<div class="columns" role="row">
						${this.renderColumns()}
					</div>
					<slot></slot>
				</div>
			</div>
		`;
	}
}
