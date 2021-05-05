import '@vonage/vvd-core';
import {
	customElement, html, LitElement, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar.css';
import {
	assertIsValidDateStringRepresentation,
	getValidDatetimeString
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
	#hoursOfDay = (Array.from({ length: 23 }) as Date[])
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
		return new Intl.DateTimeFormat(this.locale, options).format(date);
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
						<time datetime=${getValidDatetimeString(date)}>
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
