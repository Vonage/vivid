import { customElement } from 'lit-element';
import { Drawer as MWCDrawer } from '@material/mwc-drawer';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-drawer': VWCDrawer;
	}
}

@customElement('vwc-drawer')
export class VWCDrawer extends MWCDrawer {}
