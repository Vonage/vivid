import '@vonage/vvd-core';
import { customElement, property } from 'lit/decorators';
import { observer } from '@material/mwc-base/observer';
import { TopAppBarBase as MWCTopAppBarBase } from '@material/mwc-top-app-bar/mwc-top-app-bar-base.js';
import { styles as MWCTopAppBarStyles } from '@material/mwc-top-app-bar/mwc-top-app-bar.css.js';
import { style as VWCTopAppBarStyle } from './vwc-top-app-bar.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-top-app-bar': VWCTopAppBar;
	}
}

/**
 * This component is an extension of [<mwc-top-app-bar>](https://github.com/material-components/material-components-web-components/tree/master/packages/top-app-bar)
 */
@customElement('vwc-top-app-bar')
export class VWCTopAppBar extends MWCTopAppBarBase {
	@property({ type: Boolean })
	@observer(function (this: VWCTopAppBar, newVal: boolean) {
		if (newVal) {
			this.mdcRoot.setAttribute('part', 'vvd-scheme-alternate');
		} else {
			this.mdcRoot.removeAttribute('part');
		}
	})
	alternate = false;

	static override styles = [MWCTopAppBarStyles, VWCTopAppBarStyle];
}
