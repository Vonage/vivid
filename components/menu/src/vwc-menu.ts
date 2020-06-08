import { Menu } from '@material/mwc-menu';
import { customElement } from 'lit-element';

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
// Menu.styles = ...

@customElement('vwc-menu')
export class VWCMenu extends Menu {}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-menu': VWCMenu;
	}
}
