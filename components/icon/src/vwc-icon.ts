import { customElement } from 'lit-element';
import { Icon as MWCIcon } from '@material/mwc-icon';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon': VWCIcon;
	}
}

@customElement('vwc-icon')
export class VWCIcon extends MWCIcon {}
