import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Checkbox as MWCCheckbox } from '@material/mwc-checkbox';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-checkbox': VWCCheckbox;
	}
}

@customElement('vwc-checkbox')
export class VWCCheckbox extends MWCCheckbox { }
