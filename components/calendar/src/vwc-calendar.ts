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
	#hoursOfDay = [
		'1 am',
		'2 am',
		'3 am',
		'4 am',
		'5 am',
		'6 am',
		'7 am',
		'8 am',
		'8 am',
		'9 am',
		'10 am',
		'11 am',
		'12 am',
		'1 pm',
		'2 pm',
		'3 pm',
		'4 pm',
		'5 pm',
		'6 pm',
		'7 pm',
		'8 pm',
		'9 pm',
		'10 pm',
		'11 pm',
	];

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
	 * assign styles
	 * @internal
	 * */
	private getStyledWeekday(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			day: '2-digit',
			weekday: 'short',
		}).format(date);
	}

	/**
	 * Returns a valid date string from date object e.g. 2020-01-01
	 *
	 * @remarks
	 * This method is part of the html time tag, used for datetime attribute value.
	 *
	 * @param date - js date object
	 * @internal
	 * */
	private getValidDateString(date: Date) {
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
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		return html`
			<div class="container">
				<ol class="headline">
					${this.getDaysArr([this.getFirstDateOfTheWeek(this.datetime)]).map(
		date => html`<li>
			<time datetime=${this.getValidDateString(date)}>${this.getStyledWeekday(date)}</time>
		</li>`
	)}
				</ol>
				<ol class="time">
					<!-- TODO: align to convention of generation from first hour in day and a length of hours. -->
					<!-- TODO: get styled hour and datetime value -->
					${this.#hoursOfDay.map(h => html`<li><time>${h}</time></li>`)}
				</ol>
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
