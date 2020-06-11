import { customElement } from 'lit-element';
import { Formfield as MWCFormfield } from '@material/mwc-formfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-formfield': VWCFormfield;
	}
}

@customElement('vwc-formfield')
export class VWCFormfield extends MWCFormfield {}
