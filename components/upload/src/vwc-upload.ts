import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { UploadBase } from './vwc-upload-base.js';
import { style } from './vwc-upload.css.js';

@customElement('vwc-upload')
export class Upload extends UploadBase {
	static styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-upload': Upload;
	}
}
