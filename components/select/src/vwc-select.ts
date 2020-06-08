import { customElement } from 'lit-element';
import { Select as MWCSelect } from '@material/mwc-select';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-select': VWCSelect;
	}
}

@customElement('vwc-select')
export class VWCSelect extends MWCSelect {}
