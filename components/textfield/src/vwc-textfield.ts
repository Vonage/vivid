import { customElement, property,html, TemplateResult } from 'lit-element';
import { nothing } from 'lit-html';
import '@vonage/vwc-notched-outline';
import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';
import { addInputToForm } from '@vonage/vvd-foundation/form-association';
export { TextFieldType } from '@material/mwc-textfield';
import '@vonage/vwc-icon';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-textfield': VWCTextField;
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextField.styles = [styleCoupling, mwcTextFieldStyle, vwcTextFieldStyle];

const shapes = ['rounded', 'pill'] as const;
export type TextFieldShape = typeof shapes;

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {  
  @property({ type: Boolean }) dense = false;

  @property({ type: String, reflect: true })
  shape: TextFieldShape[number] = 'rounded';

	@property({ type: HTMLInputElement, reflect: false })
	hiddenInput: HTMLInputElement | undefined;

	@property({ type: String, reflect: true })
	form: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot?.querySelector('.mdc-notched-outline')?.shadowRoot?.querySelector('.mdc-notched-outline')?.classList.add('vvd-notch');
		addInputToForm(this);
  }

  protected renderIcon(): TemplateResult {
		return html`<vwc-icon size="small" type="${this.icon}"></vwc-icon>`;
  }
  
  protected renderRipple(): TemplateResult {
		return html``;
  }

  protected renderLineRipple() {
    return html``;
  }

  protected renderOutline() {
    if (!this.outlined) {
      return nothing;
    }

    return html`
      <mwc-notched-outline
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`;
  }
}
