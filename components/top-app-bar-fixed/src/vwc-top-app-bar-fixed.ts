import '@vonage/vvd-core';
import { customElement, property } from 'lit-element';
import { observer } from '@material/mwc-base/observer.js';
import { TopAppBarFixedBase as MWCTopAppBarFixedBase } from '@material/mwc-top-app-bar-fixed/mwc-top-app-bar-fixed-base.js';
import { styles as MWCTopAppBarStyles } from '@material/mwc-top-app-bar/mwc-top-app-bar.css.js';
import { style as VWCTopAppBarStyle } from '@vonage/vwc-top-app-bar/vwc-top-app-bar.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-top-app-bar-fixed': VWCTopAppBarFixed;
	}
}

/**
 * This component is an extension of [<mwc-top-app-bar-fixed>](https://github.com/material-components/material-components-web-components/tree/master/packages/top-app-bar-fixed)
 */
@customElement('vwc-top-app-bar-fixed')
export class VWCTopAppBarFixed extends MWCTopAppBarFixedBase {
	@property({ type: Boolean })
	@observer(function (this: VWCTopAppBarFixed, newVal: boolean) {
		if (newVal) {
			this.mdcRoot.setAttribute('part', 'vvd-scheme-alternate');
		} else {
			this.mdcRoot.removeAttribute('part');
		}
	})
		alternate = false;

	static override styles = [MWCTopAppBarStyles, VWCTopAppBarStyle];
}
