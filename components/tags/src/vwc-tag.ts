import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { VWCTagBase } from './vwc-tag-base';
import { customElement } from 'lit-element';
import { style } from './vwc-tag.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tag': VWCTag;
	}
}

@customElement('vwc-tag')
export class VWCTag extends VWCTagBase {
	static styles = style;
}
