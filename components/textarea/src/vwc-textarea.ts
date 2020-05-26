import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TextArea as MWCTextArea } from '@material/mwc-textarea';

export { TextFieldType } from '@material/mwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textarea': VWCTextArea;
	}
}

@customElement('vwc-textarea')
export class VWCTextArea extends MWCTextArea { }
