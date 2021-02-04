import { customElement, property } from 'lit-element';
import { style as vwcDatepickerStyles } from './vwc-datepicker.css.js';
import { LitFlatpickr } from 'lit-flatpickr';
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import 'flatpickr/dist/plugins/monthSelect/style.css';

/**
 * TODO:
 * - apply styles to inline mode
 * - update <any> types
 * - use flatpicker instance _createElement
 * - week and month picker plugin
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
	@property({ type: Boolean, reflect: true })
	weekSelect = false;

	@property({ type: Boolean, reflect: true })
	monthSelect = false;

	// prevents flatpickr from being appended to slotted components when inline
	private appendTo: (Node & ParentNode) | null = this.parentNode;
	private plugins: Array<any> = [];

	constructor() {
		super();
		// override LitFlatpickr to work with [flatpickr change](https://github.com/flatpickr/flatpickr/blame/07cf1b1ba5ec71da511c295f622d60eed3bf3eb7/src/index.ts#L1522)
		// flatpickr now requires `enable` to be `undefined` by default rather than `[]`
		this.enable = <any>undefined;

		// inject custom flatpicker styles
		const style = document.createElement('style');
		style.innerHTML = vwcDatepickerStyles.cssText;
		document.head.appendChild(style);

		this.onReady = () => {
			// slot flatpickr alt/mobile input in vwc-textfield
			// mobileInput is underfined onReady
			setTimeout(() => {
				this._instance?.altInput?.setAttribute('slot', 'formInputElement');
				this._instance?.mobileInput?.setAttribute('slot', 'formInputElement');
			}, 1);
		};

		this.onChange = (e) => {
			this.changeHandler(e);
		};

		this.onOpen = () => {
			this._instance?.calendarContainer.classList.add('vvd-datepicker');
			this.renderHeader();
			this.renderRange();
			this.renderFooter();
		};
	}

	firstUpdated(): void {
		super.firstUpdated();

		if (this.monthSelect) {
			this.plugins.push(
				monthSelectPlugin({
					shorthand: true,
					dateFormat: 'm.y',
					altFormat: 'F Y',
				})
			);
		} else if (this.weekSelect) {
			this.plugins.push(weekSelect());
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this._instance?.destroy();
	}

	private changeHandler(e: any): void {
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
				startDate
					? rangeStart.classList.add('selected')
					: rangeStart.classList.remove('selected');
			}
			if (rangeEnd) {
				rangeEnd.textContent = endDate;
				endDate
					? rangeEnd.classList.add('selected')
					: rangeEnd.classList.remove('selected');
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

			const prevMonth: any = document.createElement('vwc-icon-button');
			prevMonth.icon = 'left-full';
			prevMonth.shape = 'circled';
			prevMonth.dense = true;

			const nextMonth: any = document.createElement('vwc-icon-button');
			nextMonth.icon = 'right-full';
			nextMonth.shape = 'circled';
			nextMonth.dense = true;

			const currentMonthContainer = document.createElement('div');
			currentMonthContainer.classList.add('month');

			const currentYearContainer = document.createElement('div');
			currentYearContainer.classList.add('year');

			header.appendChild(currentMonthContainer);
			header.appendChild(currentYearContainer);
			header.appendChild(prevMonth);
			header.appendChild(nextMonth);
			this._instance?.calendarContainer.prepend(header);

			this.updateCurrentMonth();
			this.updateCurrentYear();

			prevMonth.addEventListener('mousedown', (e: InputEvent) => {
				this.navigateMonths(e, -1);
			});

			nextMonth.addEventListener('mousedown', (e: InputEvent) => {
				this.navigateMonths(e, 1);
			});
		}
	}

	private navigateMonths(e: InputEvent, delta: number): void {
		e.preventDefault();
		e.stopPropagation();
		this._instance?.changeMonth(delta);
		this.updateCurrentMonth();
		this.updateCurrentYear();
	}

	private updateCurrentMonth(): void {
		const currentMonthContainer = this._instance?.calendarContainer.querySelector(
			'.vvd-datepicker-header .month'
		);
		const currentMonth = this._instance?.l10n.months['longhand'][
			this._instance.currentMonth
		];
		if (currentMonthContainer) {
			currentMonthContainer.textContent = currentMonth ? currentMonth : '';
		}
	}

	private updateCurrentYear(): void {
		const currentYearContainer = this._instance?.calendarContainer.querySelector(
			'.vvd-datepicker-header .year'
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

			const clearButton: any = document.createElement('vwc-button');
			clearButton.label = 'Clear';
			clearButton.shape = 'pill';
			clearButton.dense = true; // css preventing programmatic update
			clearButton.addEventListener('mousedown', (e: InputEvent) => {
				e.preventDefault();
				e.stopPropagation();
				this._instance?.clear();
			});

			footer.appendChild(clearButton);
			this._instance?.calendarContainer.appendChild(footer);
		}
	}

	// copied from lit-flatpickr
	// add additional config options
	getOptions(): any {
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
			...(this.plugins.length && { plugins: this.plugins }),
			// closeOnSelect: false
		};
	}
}
