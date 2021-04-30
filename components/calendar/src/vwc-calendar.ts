import '@vonage/vvd-core';
import {
	customElement, html, LitElement, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-calendar': VWCCalendar;
	}
}

function assertIsString(d: unknown): asserts d is string {
	if (!(typeof d == 'string')) throw new Error(`Not a string: ${d}`);
}

function assertIsValidDateStringRepresentation(d: unknown): asserts d is Date {
	assertIsString(d);
	if (Number.isNaN(Date.parse(d))) throw new Error(`Not a valid date string representation: ${d}`);
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
			fromAttribute(value) {
				// throw if not a valid date string representation
				assertIsValidDateStringRepresentation(value);
				return new Date(value);
			}
		}
	})
	datetime?: Date;

	#daysLength = 7;
	#hoursOfDay = (Array.from({ length: 23 }) as Date[])
		.fill(new Date(new Date().setHours(0, 0, 0)))
		.map((d, i) => new Date(d.setHours(++i)))

	/**
	 * generate dates array of days of the week by given date
	 *
	 * @param date - js date object
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

	private getFirstDateOfTheWeek(date: Date = new Date()): Date {
		return new Date(date.setDate(date.getDate() - date.getDay()));
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

	/**
	 * Returns a valid date string from date object e.g. 2020-01-01
	 *
	 * @remarks
	 * This method returns valid date string to be used as html time tag datetime value
	 *
	 * @param date - js date object
	 *
	 * @internal
	 * */
	private getValidDatetimeString(date: Date) {
		return date.toISOString().split('T')[0];
	}

	protected renderTimeCells(): TemplateResult[] {
		const templates = [];
		for (let i = 0; i < (this.#hoursOfDay.length + 1) * this.#daysLength; i++) {
			templates.push(html`<div role="listitem" tabindex="0"></div>`);
		}
		return templates;
	}

	/**
	 * The html days markup
	 * @internal
	 * */
	protected renderDays(): TemplateResult {
		return html`
			<ol class="headline">
					${this.getDaysArr([this.getFirstDateOfTheWeek(this.datetime)]).map(date => html`
					<li>
						<time datetime=${this.getValidDatetimeString(date)}>
							${this.formatDate(date, {	day: '2-digit',	weekday: 'short' })}
						</time>
					</li>`)}
			</ol>`;
	}

	/**
	 * the html days markup
	 * @internal
	 * */
	protected renderHours(): TemplateResult {
		return html`
			<ol class="time">
				<!-- TODO: align to convention of generation from first hour in day and a length of hours. -->
				<!-- TODO: get styled hour and datetime value -->
				${this.#hoursOfDay.map(h => html`<li>
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
		console.log(this.#hoursOfDay.length);
		return html`
			<div class="container">
				${this.renderDays()}
				${this.renderHours()}
				<div class="calendar" role="list">
					${this.renderTimeCells()}
					<!-- TODO: should be presented as a custom element. then could look for siblings and indent by js  -->
					<div role="presentation">
						<slot></slot>
					</div>
				</div>
			</div>
		`;
	}
}
