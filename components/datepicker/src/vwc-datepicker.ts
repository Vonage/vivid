import '@vonage/vvd-core';
import { customElement, property } from 'lit-element';
import { LitFlatpickr } from 'lit-flatpickr';
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import 'flatpickr/dist/plugins/monthSelect/style.css';

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
		};
	}
}
