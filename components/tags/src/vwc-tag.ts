import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { VWCTagBase } from './vwc-tag-base.js';
import { customElement } from 'lit/decorators';
import { style } from './vwc-tag.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tag': VWCTag;
	}
}

@customElement('vwc-tag')
export class VWCTag extends VWCTagBase {
	static override styles = style;
}
