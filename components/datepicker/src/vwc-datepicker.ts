import '@vonage/vvd-core';
import '@vonage/vwc-menu';
import '@vonage/vwc-textfield';
import { html, CSSResult } from 'lit';
import { customElement,	property, query } from 'lit/decorators';
import { LitFlatpickr } from 'lit-flatpickr';
import * as weekSelectPlugin from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import type { Options } from 'flatpickr/dist/types/options';
import { style as vwcDatepickerStyles } from './vwc-datepicker.css.js';
import type { VWCButton, ButtonLayout } from '@vonage/vwc-button';
import type { VWCIconButton } from '@vonage/vwc-icon-button';
import { Shape } from '@vonage/vvd-foundation/constants';

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
	static override get styles(): CSSResult {
		return vwcDatepickerStyles;
	}

	@query('.vvd-datepicker-wrapper')
	private datepickerWrapper?: HTMLElement;

	@property({ type: Boolean, reflect: true })
	monthPicker = false;

	@property({ type: Boolean, reflect: true })
	weekSelect = false;

	@property({ type: Boolean, reflect: true })
	closeOnSelect = false;

	@property({ type: Boolean, reflect: true })
	fixedMenuPosition = false;

	anchor: HTMLElement | null = this;

	private appendTo: HTMLElement | undefined;

	private plugins: Array<any> = [];

	constructor() {
		super();
		// override LitFlatpickr to work with [flatpickr change](https://github.com/flatpickr/flatpickr/blame/07cf1b1ba5ec71da511c295f622d60eed3bf3eb7/src/index.ts#L1522)
		// flatpickr now requires `enable` to be `undefined` by default rather than `[]`
		(this.enable as unknown) = undefined;

		// use custom open handler instead of lit-flatpickr
		this.clickOpens = false;

		// dispatched by flatpickr on date change
		this.addEventListener('change', this.changeHandler);
	}

	override firstUpdated(): void {
		super.firstUpdated();

		const input = this.querySelector('vwc-textfield');
		if (input) input.onclick = () => this.open();

		// find alternative to free up this hook
		this.onClose = () => {
			const menu = this.shadowRoot?.querySelector('vwc-menu');
			if (menu) menu.open = false;
		};

		if (this.weekSelect) {
			this.plugins.push(weekSelectPlugin.default());
		}
	}

	// override lit-flatpicker
	override open(): void {
		const menu = this.shadowRoot?.querySelector('vwc-menu');
		const datepicker = this.datepickerWrapper?.querySelector('.vvd-datepicker');

		if (menu) menu.open = true;
		datepicker?.classList.add('open');
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._instance?.destroy();
	}

	override render() {
		return html`
			${!this._hasSlottedElement ? html`<input class="lit-flatpickr flatpickr flatpickr-input" />` : html``}
			<slot></slot>
			${this.inline
		? html`<div class="vvd-datepicker-wrapper"></div>`
		: html`<vwc-menu
						.anchor=${this.anchor}
						.absolute=${!this.fixedMenuPosition}
						.fixed=${this.fixedMenuPosition}
						corner='BOTTOM_START'
					>
						<div class="vvd-datepicker-wrapper"></div>
					</vwc-menu>`
}
		`;
	}

	override async init() {
		this.appendTo = this.datepickerWrapper;
		this.initializeComponent();
		this.renderCustomParts();
		this.disableAdjacentMonthDays();
		this.inlineDayClickHandlers();
	}

	private renderCustomParts(): void {
		if (!this._instance?.isMobile || this.disableMobile) {
			this._instance?.calendarContainer.classList.add('vvd-datepicker');

			this.renderHeader();
			this.renderRange();
			if (!this.closeOnSelect && !this.inline) this.renderFooter();
			this.renderMonthPicker();

			if (this.monthPicker) {
				this._instance?.calendarContainer.classList.add(
					'vvd-datepicker-month-view'
				);
				this.highlightMonth();
			}
		}

		// slot flatpickr alt/mobile input in vwc-textfield
		if (this._instance?.altInput) {
			this._instance.input.style.visibility = 'hidden';
			this._instance.altInput.setAttribute('slot', 'formInputElement');
			this._instance.altInput.classList.add('vvd-datepicker-alt-input');
		}
		this._instance?.mobileInput?.setAttribute('slot', 'formInputElement');

		// clear week select hover on mouseleave
		if (this.weekSelect) {
			const daysContainer = this._instance?.daysContainer;

			daysContainer?.addEventListener('mouseleave', () => {
				const days = daysContainer.querySelectorAll('.flatpickr-day');
				days.forEach((day) => {
					day.classList.remove('inRange');
				});
			});
		}
	}

	private changeHandler(): void {
		// populate dates in custom range container
		if (this._instance && this.mode === 'range') {
			const dates = this._instance?.selectedDates;

			const startDate = dates[0] ? this._instance.formatDate(dates[0], 'M j, Y') : '';
			const endDate = dates[1] ? this._instance.formatDate(dates[1], 'M j, Y') : '';

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

		this.highlightSelectedWeekDay();
	}

	private renderHeader(): void {
		if (
			!this.noCalendar
			&& !this._instance?.calendarContainer.querySelector('.vvd-datepicker-header')
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

			const headerMonthContainer = document.createElement('div');
			headerMonthContainer.classList.add('vvd-header-month');

			const headerYearContainer = document.createElement('div');
			headerYearContainer.classList.add('vvd-header-year');

			header.appendChild(headerMonthContainer);
			header.appendChild(headerYearContainer);
			header.appendChild(prevMonth);
			header.appendChild(nextMonth);
			this._instance?.calendarContainer.prepend(header);

			this.updateHeaderMonth();
			this.updateHeaderYear();

			headerMonthContainer.onclick = () => {
				this._instance?.calendarContainer.classList.add(
					'vvd-datepicker-month-view'
				);
				this.highlightMonth();
			};

			prevMonth.addEventListener('click', (e: MouseEvent) => this.navigateCalendar(e, -1));
			prevMonth.addEventListener('touchend', (e: TouchEvent) => this.navigateCalendar(e, -1));

			nextMonth.addEventListener('click', (e: MouseEvent) => this.navigateCalendar(e, 1));
			nextMonth.addEventListener('touchend', (e: TouchEvent) => this.navigateCalendar(e, 1));
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

		this.updateHeaderMonth();
		this.updateHeaderYear();
		this.highlightSelectedWeekDay();
		this.disableAdjacentMonthDays();
	}

	private updateHeaderMonth(): void {
		const currentMonthContainer = this._instance?.calendarContainer.querySelector(
			'.vvd-datepicker-header .vvd-header-month'
		);
		const currentMonth = this._instance?.l10n.months.longhand[
			this._instance.currentMonth
		];
		if (currentMonthContainer) {
			currentMonthContainer.textContent = currentMonth || '';
		}
	}

	private updateHeaderYear(): void {
		const headerYearContainer = this._instance?.calendarContainer.querySelector(
			'.vvd-datepicker-header .vvd-header-year'
		);
		const currentYear = this._instance?.currentYear.toString();
		if (headerYearContainer) {
			headerYearContainer.textContent = currentYear || '';
		}
	}

	private renderRange(): void {
		if (
			this.mode === 'range'
			&& !this._instance?.calendarContainer.querySelector('.vvd-datepicker-range')
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
			!this.noCalendar
			&& !this._instance?.calendarContainer.querySelector('.vvd-datepicker-footer')
		) {
			const footer = document.createElement('div');
			footer.classList.add('vvd-datepicker-footer');

			const clearButton: VWCButton = document.createElement('vwc-button');
			clearButton.label = 'Clear';
			clearButton.dense = true;

			const confirmButton: VWCButton = document.createElement('vwc-button');
			confirmButton.label = 'Confirm';
			confirmButton.layout = 'outlined' as ButtonLayout;
			confirmButton.dense = true;

			clearButton.addEventListener('click', (e: MouseEvent) => this.clearSelection(e));
			clearButton.addEventListener('touchend', (e: TouchEvent) => this.clearSelection(e));

			confirmButton.addEventListener('click', () => this.close());
			confirmButton.addEventListener('touchend', () => this.close());

			footer.appendChild(clearButton);
			footer.appendChild(confirmButton);
			this._instance?.calendarContainer.appendChild(footer);
		}
	}

	private clearSelection(e: MouseEvent | TouchEvent): void {
		e.preventDefault();
		e.stopPropagation();

		this._instance?.clear();
		this.updateHeaderMonth();
		this.updateHeaderYear();
	}

	private renderMonthPicker(): void {
		if (
			!this.noCalendar
			&& !this._instance?.calendarContainer.querySelector('.vvd-datepicker-months')
		) {
			const monthPicker = document.createElement('div');
			monthPicker.classList.add('vvd-datepicker-months');

			for (let i = 0; i < 12; i++) {
				const month = document.createElement('span');
				month.classList.add('vvd-month');

				if (i === this._instance?.currentMonth) {
					month.classList.add('vvd-current-month');
				}

				month.textContent = this._instance?.l10n.months.shorthand[i] || '';
				month.onclick = () => this.selectMonth(i);
				monthPicker.appendChild(month);
			}

			this._instance?.calendarContainer.appendChild(monthPicker);
		}
	}

	private selectMonth(selectedMonth: number): void {
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
			this.updateHeaderMonth();
			this.updateHeaderYear();
			this.highlightSelectedWeekDay();
		}
	}

	private highlightMonth(): void {
		const months = this._instance?.calendarContainer.querySelectorAll('.vvd-month');
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
		todaysMonth
			&& months?.[todaysMonth].classList.toggle(
				'vvd-current-month',
				currentYear === todaysYear
			);

		// toggle selected month class
		startDate
			&& months?.[startDate.getMonth()].classList.toggle(
				'vvd-selected',
				startDate.getFullYear() === currentYear
			);
		endDate
			&& months?.[endDate.getMonth()].classList.toggle(
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

	private highlightSelectedWeekDay(): void {
		if (this._instance && this.weekSelect) {
			const className = 'vvd-selected-week-day';
			const selectedWeekDay = this._instance.calendarContainer.querySelector(`.${className}`);
			selectedWeekDay?.classList.remove(className);
			this._instance.selectedDateElem?.classList.add(className);
		}

		// reset inline day handlers after lit-flatpickr update
		if (this.inline && this.weekSelect) {
			this.inlineDayClickHandlers();
		}
	}

	private disableAdjacentMonthDays(): void {
		const disabledMonthDays = this._instance?.calendarContainer.querySelectorAll('.prevMonthDay, .nextMonthDay');

		disabledMonthDays?.forEach((day) => {
			day.setAttribute('aria-disabled', 'true');
		});
	}

	private inlineDayClickHandlers(): void {
		// inline mode doesn't dispatch change event on day select so trigger changeHandler here
		if (this.inline && this.weekSelect) {
			const days = this._instance?.calendarContainer.querySelectorAll('.flatpickr-day') as NodeListOf<HTMLElement>;

			days.forEach((day) => {
				day.onclick = () => {
					setTimeout(() => {
						this.changeHandler();
					}, 0);
				};
			});
		}
	}

	// copied from lit-flatpickr
	// add additional config options
	override getOptions(): Options {
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
			...(this.enable && { enable: this.enable }),
			...(this.plugins.length && { plugins: this.plugins }),
			appendTo: this.appendTo,
			closeOnSelect: this.closeOnSelect
		};
	}
}
