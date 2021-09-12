import '@vonage/vwc-tags/vwc-tag.js';

import { VWCTagsBase } from './vwc-tags-base';
import { customElement } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tags': VWCTags;
	}
}

@customElement('vwc-tags')
export class VWCTags extends VWCTagsBase {
}
