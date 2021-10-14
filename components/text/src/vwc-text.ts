import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { VWCTextBase } from './vwc-text-base.js';
import { style } from './vwc-text.css.js';


@customElement('vwc-text')
export class VWCText extends VWCTextBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-text': VWCText;
	}
}
