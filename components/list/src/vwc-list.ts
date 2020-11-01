import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { List as MWCList } from '@material/mwc-list/mwc-list';
import { style as vwcListStyle } from './vwc-list.css.js';
import { style as mwcListStyle } from '@material/mwc-list/mwc-list-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list': VWCList;
	}
}

function debounce(
	callback: <T>(this: T, ...args: any[]) => void,
	waitInMS = 50
) {
	let timeoutId: NodeJS.Timeout;
	return function <T>(this: T, ...args: any[]) {
		clearTimeout(timeoutId);
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const context = this;
		timeoutId = setTimeout(() => callback.apply(context, args), waitInMS);
	};
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCList.styles = [styleCoupling, mwcListStyle, vwcListStyle];

const debouncedLayout = debounce(function <T>(this: T, ...args: any[]) {
	if (!this) {
		return;
	}
	MWCList.prototype.layout(...args);
});
/**
 * This component is an extension of [<mwc-list>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-list')
export class VWCList extends MWCList {
	layout(updateItems?: boolean): void {
		debouncedLayout(updateItems, 25);
	}
}
