import { customElement, property } from 'lit-element';
import '@vonage/vwc-notched-outline';
import { TextArea as MWCTextArea } from '@material/mwc-textarea';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextareaStyle } from './vwc-textarea.css';
import { style as mwcTextareaStyle } from '@material/mwc-textarea/mwc-textarea-css.js';
import { addInputToForm } from '@vonage/vvd-foundation/form-association';

export { TextFieldType } from '@material/mwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textarea': VWCTextArea;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextArea.styles = [styleCoupling, mwcTextareaStyle, vwcTextareaStyle];

/**
 * This component is an extension of [<mwc-textarea>](https://github.com/material-components/material-components-web-components/tree/master/packages/textarea)
 */
@customElement('vwc-textarea')
export class VWCTextArea extends MWCTextArea {
	@property({ type: String, reflect: true })
	form: string | undefined;
	
	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot?.querySelector('.mdc-notched-outline')?.shadowRoot?.querySelector('.mdc-notched-outline')?.classList.add('vvd-notch');
		addInputToForm(this, 'textarea');
	}
}
