import { customElement, property } from 'lit-element';
import { ListItem as MWCListItem } from '@material/mwc-list/mwc-list-item';
import { style as vwcListItemStyle } from './vwc-list-item.css.js';
import { style as mwcListItemStyle } from '@material/mwc-list/mwc-list-item-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { Shape } from '@vonage/vvd-foundation/constants';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list-item': VWCListItem;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCListItem.styles = [styleCoupling, mwcListItemStyle, vwcListItemStyle];

type ListItemShape = Extract<Shape, Shape.Rounded>;

/**
 * This component is an extension of [<mwc-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-list-item')
export class VWCListItem extends MWCListItem {
	@property({ type: String, reflect: true })
	shape?: ListItemShape;

	disconnectedCallback(): void {
		for (const listener of this.listeners) {
			for (const eventName of listener.eventNames) {
				listener.target.removeEventListener(eventName, listener.cb);
			}
		}
		if (
			this._managingList &&
			((this._managingList as unknown) as HTMLElement).isConnected
		) {
			this._managingList.layout(true);
		}
	}
}
