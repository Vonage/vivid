import { customElement, html, LitElement, TemplateResult } from 'lit-element';
import { style } from './vwc-calendar.css';

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
	static styles = style;

	#daysLength = 7;
	#hoursOfDay = [
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
	];

	/**
	 * generate dates array of days of the week by given date
	 *
	 * @param date - js date object
	 * @internal
	 * */
	private getWeekdaysByDate(date: Date): Date[] {
		let firstDateOfTheWeek = date.getDate() - date.getDay();

		return Array.from(
			{ length: this.#daysLength },
			() => new Date(date.setDate(firstDateOfTheWeek++))
		);
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
		for (let i = 0; i < this.#hoursOfDay.length * this.#daysLength; i++) {
			templates.push(html`<li></li>`);
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
					${this.getWeekdaysByDate(new Date()).map(
						(date) =>
							html`<li>
								<time datetime=${this.getValidDateString(date)}
									>${this.getStyledWeekday(date)}</time
								>
							</li>`
					)}
				</ol>
				<ol class="time">
					<!-- TODO: align to convention of generation from first hour in day and a length of hours. -->
					<!-- TODO: get styled hour and datetime value -->
					${this.#hoursOfDay.map((h) => html`<li><time>${h}</time></li>`)}
				</ol>
				<ol class="calendar">
					${this.renderTimeCells()}
				</ol>
			</div>
			ol.calendar - for (var x = 0; x < 15 * 7; x++) li
			section.task.task-1(style="--column: 1; --row: 9 / span 24; --color:
			#4cc3d2;") section.task(style="--column: 6; --row: 5 / span 16; --color:
			#d6219c;") section.task(style="--column: 4; --row: 13 / span 10; --color:
			#b779ff;") section.task(style="--column: 1; --row: 13 / span 32; --color:
			#b779ff;--overlap-count: 2;") section.task(style="--column: 1; --row: 15 /
			span 8; --color: #d6219c;--overlap-count: 1;")
		`;
	}
}
