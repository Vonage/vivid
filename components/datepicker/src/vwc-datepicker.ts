import '@vonage/vvd-core';
import '@vonage/vwc-button';
import '@vonage/vwc-icon-button';
import { customElement, property } from 'lit-element';
import { LitFlatpickr } from 'lit-flatpickr';
import { Options } from 'flatpickr/dist/types/options';
import { style as vwcDatepickerStyles } from './vwc-datepicker.css.js';
import { VWCButton } from '@vonage/vwc-button';
import { VWCIconButton } from '@vonage/vwc-icon-button';
import { Shape } from '@vonage/vvd-foundation/constants';
// import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect';

/**
 * TODO:
 * - setup week picker
 */

declare global {
	interface HTMLElementTagNameMap {
		'vwc-datepicker': VWCDatepicker;
	}
}

/**
 * This component is an extension of [<lit-flatpickr>](https://github.com/Matsuuu/lit-flatpickr)
 */
@customElement('vwc-datepicker')
export class VWCDatepicker extends LitFlatpickr {
	// @property({ type: Boolean, reflect: true })
	// weekSelect = false;

	@property({ type: Boolean, reflect: true })
	monthPicker = false;

	@property({ type: Boolean, reflect: true })
	closeOnSelect = false;

	// prevents flatpickr from being appended to slotted components when inline
	private appendTo: HTMLElement | undefined = this.parentElement
		? this.parentElement
		: undefined;
	// private plugins: Array<any> = [];

	constructor() {
		super();
		// override LitFlatpickr to work with [flatpickr change](https://github.com/flatpickr/flatpickr/blame/07cf1b1ba5ec71da511c295f622d60eed3bf3eb7/src/index.ts#L1522)
		// flatpickr now requires `enable` to be `undefined` by default rather than `[]`
		(<undefined>(<unknown>this.enable)) = undefined;

		// inject custom flatpicker styles
		const style = document.createElement('style');
		style.innerHTML = vwcDatepickerStyles.cssText;
		document.head.appendChild(style);

		this.onReady = () => {
			this.readyHandler();
		};

		this.onChange = (e) => {
			this.changeHandler(e);
		};
	}

	// firstUpdated(): void {
	// 	super.firstUpdated();

	// 	if (this.weekSelect) {
	// 		this.plugins.push(weekSelect());
	// 	}
	// }

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this._instance?.destroy();
	}

	private readyHandler(): void {
		// wait for DOM
		setTimeout(() => {
			if (!this._instance?.isMobile || this.disableMobile) {
				this._instance?.calendarContainer.classList.add('vvd-datepicker');

				this.renderHeader();
				this.renderRange();
				this.renderFooter();
				this.renderMonthPicker();

				if (this.monthPicker) {
					this._instance?.calendarContainer.classList.add(
						'vvd-datepicker-month-view'
					);
					this.highlightMonth();
				}
			}
			// slot flatpickr alt/mobile input in vwc-textfield
			this._instance?.altInput?.setAttribute('slot', 'formInputElement');
			this._instance?.mobileInput?.setAttribute('slot', 'formInputElement');
		}, 0);
	}

	private changeHandler(e: Date[]): void {
		// populate dates in custom range container
		if (this._instance && this.mode === 'range') {
			const startDate = e[0] ? this._instance.formatDate(e[0], 'M j, Y') : '';
			const endDate = e[1] ? this._instance.formatDate(e[1], 'M j, Y') : '';

			const rangeStart = this._instance.calendarContainer.querySelector(
				'.vvd-datepicker-range-start'
			);
			const rangeEnd = this._instance.calendarContainer.querySelector(
				'.vvd-datepicker-range-end'
			);

			if (rangeStart) {
				rangeStart.textContent = startDate;
				rangeStart.classList.toggle('vvd-selected', !!startDate);
			}
			if (rangeEnd) {
				rangeEnd.textContent = endDate;
				rangeEnd.classList.toggle('vvd-selected', !!endDate);
			}
		}
	}

	private renderHeader(): void {
		if (
			!this.noCalendar &&
			!this._instance?.calendarContainer.querySelector('.vvd-datepicker-header')
		) {
			const header = document.createElement('div');
			header.classList.add('vvd-datepicker-header');

			const prevMonth: VWCIconButton = document.createElement('vwc-icon-button');
			prevMonth.icon = 'left-full';
			prevMonth.shape = Shape.Circled;
			prevMonth.dense = true;

			const nextMonth: VWCIconButton = document.createElement('vwc-icon-button');
			nextMonth.icon = 'right-full';
			nextMonth.shape = Shape.Circled;
			nextMonth.dense = true;

			const currentMonthContainer = document.createElement('div');
			currentMonthContainer.classList.add('vvd-month');

			const currentYearContainer = document.createElement('div');
			currentYearContainer.classList.add('vvd-year');

			header.appendChild(currentMonthContainer);
			header.appendChild(currentYearContainer);
			header.appendChild(prevMonth);
			header.appendChild(nextMonth);
			this._instance?.calendarContainer.prepend(header);

			this.updateCurrentMonth();
			this.updateCurrentYear();

			currentMonthContainer.onclick = () => {
				this._instance?.calendarContainer.classList.add(
					'vvd-datepicker-month-view'
				);
				this.highlightMonth();
			};

			prevMonth.addEventListener('mousedown', (e: MouseEvent) =>
				this.navigateCalendar(e, -1)
			);
			prevMonth.addEventListener('touchstart', (e: TouchEvent) =>
				this.navigateCalendar(e, -1)
			);

			nextMonth.addEventListener('mousedown', (e: MouseEvent) =>
				this.navigateCalendar(e, 1)
			);
			nextMonth.addEventListener('touchstart', (e: TouchEvent) =>
				this.navigateCalendar(e, 1)
			);
		}
	}

	private navigateCalendar(e: MouseEvent | TouchEvent, delta: number): void {
		e.preventDefault();
		e.stopPropagation();

		if (
			this._instance?.calendarContainer.classList.contains(
				'vvd-datepicker-month-view'
			)
		) {
			this._instance?.changeYear(this._instance?.currentYear + delta);
			this.highlightMonth();
		} else {
			this._instance?.changeMonth(delta);
		}

		this.updateCurrentMonth();
		this.updateCurrentYear();
	}

	private updateCurrentMonth(): void {
		const currentMonthContainer = this._instance?.calendarContainer.querySelector(
			'.vvd-datepicker-header .vvd-month'
		);
		const currentMonth = this._instance?.l10n.months.longhand[
			this._instance.currentMonth
		];
		if (currentMonthContainer) {
			currentMonthContainer.textContent = currentMonth ? currentMonth : '';
		}
	}

	private updateCurrentYear(): void {
		const currentYearContainer = this._instance?.calendarContainer.querySelector(
			'.vvd-datepicker-header .vvd-year'
		);
		const currentYear = this._instance?.currentYear.toString();
		if (currentYearContainer) {
			currentYearContainer.textContent = currentYear ? currentYear : '';
		}
	}

	private renderRange(): void {
		if (
			this.mode === 'range' &&
			!this._instance?.calendarContainer.querySelector('.vvd-datepicker-range')
		) {
			const rangeContainer = document.createElement('div');
			const rangeStart = document.createElement('div');
			const rangeEnd = document.createElement('div');

			rangeContainer.classList.add('vvd-datepicker-range');
			rangeStart.classList.add('vvd-datepicker-range-start');
			rangeEnd.classList.add('vvd-datepicker-range-end');

			rangeContainer.append(rangeStart, rangeEnd);
			this._instance?.monthNav.insertAdjacentElement('afterend', rangeContainer);
		}
	}

	private renderFooter(): void {
		if (
			!this.noCalendar &&
			!this._instance?.calendarContainer.querySelector('.vvd-datepicker-footer')
		) {
			const footer = document.createElement('div');
			footer.classList.add('vvd-datepicker-footer');

			const clearButton: VWCButton = document.createElement('vwc-button');
			clearButton.label = 'Clear';
			clearButton.shape = Shape.Pill;

			clearButton.addEventListener('mousedown', (e: MouseEvent) =>
				this.clearSelection(e)
			);
			clearButton.addEventListener('touchstart', (e: TouchEvent) =>
				this.clearSelection(e)
			);

			footer.appendChild(clearButton);
			this._instance?.calendarContainer.appendChild(footer);
		}
	}

	private clearSelection(e: MouseEvent | TouchEvent): void {
		e.preventDefault();
		e.stopPropagation();

		this._instance?.clear();
		this.updateCurrentMonth();
		this.updateCurrentYear();
	}

	private renderMonthPicker(): void {
		if (
			!this.noCalendar &&
			!this._instance?.calendarContainer.querySelector('.vvd-datepicker-months')
		) {
			const monthPicker = document.createElement('div');
			monthPicker.classList.add('vvd-datepicker-months');

			for (let i = 0; i < 12; i++) {
				const month = document.createElement('span');
				month.classList.add('vvd-month');

				if (i === this._instance?.currentMonth) {
					month.classList.add('vvd-current-month');
				}

				month.setAttribute('data-month', i.toString());
				month.textContent = this._instance?.l10n.months.shorthand[i] || '';
				month.onclick = (e: MouseEvent) => this.selectMonth(e);
				monthPicker.appendChild(month);
			}

			this._instance?.calendarContainer.appendChild(monthPicker);
		}
	}

	private selectMonth(e: MouseEvent): void {
		const selectedMonth = parseInt(
			(<HTMLElement>e.target).attributes[<number>(<unknown>'data-month')].value
		);
		const selectedDate = this._instance
			? new Date(this._instance.currentYear, selectedMonth)
			: '';

		if (this.monthPicker && selectedDate) {
			this._instance?.setDate(selectedDate, true);
			this.highlightMonth();

			if (this.closeOnSelect) {
				this._instance?.close();
			}
		} else {
			this._instance?.calendarContainer.classList.remove(
				'vvd-datepicker-month-view'
			);
			this._instance?.changeMonth(selectedMonth - this._instance.currentMonth);
			this.updateCurrentMonth();
			this.updateCurrentYear();
		}
	}

	private highlightMonth(): void {
		const months = this._instance?.calendarContainer.querySelectorAll(
			'[data-month]'
		);
		const startDate = this._instance?.selectedDates[0];
		const endDate = this._instance?.selectedDates[1];
		const todaysMonth = this._instance?.now.getMonth();
		const todaysYear = this._instance?.now.getFullYear();
		const maxMonth = this._instance?.config?.maxDate?.getMonth();
		const maxYear = this._instance?.config?.maxDate?.getFullYear();
		const currentYear = this._instance?.currentYear;

		// clear previous selected class
		const selected = this._instance?.calendarContainer.querySelectorAll(
			'.vvd-datepicker-months .vvd-selected'
		);
		selected?.forEach((element: Element) => {
			element.classList.remove('vvd-selected');
		});

		// toggle current month class
		todaysMonth &&
			months?.[todaysMonth].classList.toggle(
				'vvd-current-month',
				currentYear === todaysYear
			);

		// toggle selected month class
		startDate &&
			months?.[startDate.getMonth()].classList.toggle(
				'vvd-selected',
				startDate.getFullYear() === currentYear
			);
		endDate &&
			months?.[endDate.getMonth()].classList.toggle(
				'vvd-selected',
				endDate.getFullYear() === currentYear
			);

		// toggle disabled month class
		if (this.maxDate && maxMonth && currentYear && todaysYear) {
			months?.forEach((month, i) => {
				month.classList.toggle(
					'vvd-month-disabled',
					i > maxMonth && currentYear === maxYear
				);
			});
		}
	}

	// copied from lit-flatpickr
	// add additional config options
	getOptions(): Options {
		return {
			altFormat: this.altFormat,
			altInput: this.altInput,
			altInputClass: this.altInputClass,
			allowInput: this.allowInput,
			ariaDateFormat: this.ariaDateFormat,
			clickOpens: this.clickOpens,
			dateFormat: this.dateFormat,
			defaultDate: this.defaultDate,
			defaultHour: this.defaultHour,
			defaultMinute: this.defaultMinute,
			disable: this.disable,
			disableMobile: this.disableMobile,
			enableTime: this.enableTime,
			enableSeconds: this.enableSeconds,
			formatDate: this.formatDateFn,
			hourIncrement: this.hourIncrement,
			inline: this.inline,
			maxDate: this.maxDate,
			minDate: this.minDate,
			minuteIncrement: this.minuteIncrement,
			mode: this.mode,
			nextArrow: this.nextArrow,
			prevArrow: this.prevArrow,
			noCalendar: this.noCalendar,
			onChange: this.onChange,
			onClose: this.onClose,
			onOpen: this.onOpen,
			onReady: this.onReady,
			onMonthChange: this.onMonthChange,
			onYearChange: this.onYearChange,
			onValueUpdate: this.onValueUpdate,
			parseDate: this.parseDateFn,
			position: this.position,
			shorthandCurrentMonth: this.shorthandCurrentMonth,
			showMonths: this.showMonths,
			static: this.static,
			time_24hr: this.time_24hr,
			weekNumbers: this.weekNumbers,
			wrap: this.wrap,
			// additional config options
			...(this.inline && { appendTo: this.appendTo }),
			...(this.enable && { enable: this.enable }),
			// ...(this.plugins.length && { plugins: this.plugins }),
			closeOnSelect: this.closeOnSelect,
		};
	}
}
