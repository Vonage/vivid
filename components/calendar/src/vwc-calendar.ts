import '@vonage/vvd-core';
import {
	DirectiveFn
} from 'lit-html';
import {
	customElement, html, LitElement, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-calendar.css';
import {
	assertIsValidDateStringRepresentation,
	getValidDatetimeString,
	getFirstDateOfTheWeek
} from './vwc-calendar-date-functions';
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

	private getDaysArr(dateArr: Date[]): Date[] {
		if (dateArr.length == this.#daysLength) { return dateArr; }
		const lastDate = new Date(dateArr[dateArr.length - 1]);
		lastDate.setDate(lastDate.getDate() + 1);
		const concatenatedDateArr = [...dateArr, lastDate];
		return this.getDaysArr(concatenatedDateArr);
	}

	protected renderTimeCells(): DirectiveFn {
		const length = (this.#hoursOfDay.length + 1) * this.#daysLength;
		return repeat(
			Array.from({ length }),
			() => html`<div role="listitem" tabindex="0"></div>`
		);
	}

	/**
	 * The html days markup
	 * @internal
	 * */
	protected renderDays(): TemplateResult {
		return html`
			<ol class="headline">
					${repeat(this.getDaysArr([getFirstDateOfTheWeek(this.datetime)]), date => html`
					<li>
						<time datetime=${getValidDatetimeString(date)}>
							${new Intl.DateTimeFormat('en-US', {	day: '2-digit',	weekday: 'short' }).format(date)}
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
				${repeat(this.#hoursOfDay, h => html`<li>
					<time datetime="${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(h)}">
						${new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(h)}
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
