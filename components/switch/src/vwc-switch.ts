import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Switch as MWCSwitch } from '@material/mwc-switch';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-switch': VWCSwitch;
	}
}

@customElement('vwc-switch')
export class VWCSwitch extends MWCSwitch { }
