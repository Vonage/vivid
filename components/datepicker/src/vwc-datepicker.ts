import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { LitFlatpickr } from 'lit-flatpickr';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-datepicker': VWCDatepicker;
	}
}

/**
 * This component is an extension of [<lit-flatpickr>](https://github.com/Matsuuu/lit-flatpickr)
 */
@customElement('vwc-datepicker')
export class VWCDatepicker extends LitFlatpickr {}
