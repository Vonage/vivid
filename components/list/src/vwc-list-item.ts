import { customElement } from 'lit-element';
import { ListItem as MWCListItem } from '@material/mwc-list/mwc-list-item';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list-item': VWCListItem;
	}
}

@customElement('vwc-list-item')
export class VWCListItem extends MWCListItem {}
