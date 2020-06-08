import { customElement } from 'lit-element';
import { List as MWCList } from '@material/mwc-list/mwc-list';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list': VWCList;
	}
}

@customElement('vwc-list')
export class VWCList extends MWCList {}
