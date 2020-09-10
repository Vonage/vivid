import { customElement, property, html, TemplateResult } from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
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
  @property({ type: Boolean, reflect: true })
  dense = false;

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
  
  protected renderIcon(icon: string, isTrailingIcon = false): TemplateResult {
    const classes = {
      'mdc-text-field__icon--leading': !isTrailingIcon,
      'mdc-text-field__icon--trailing': isTrailingIcon
    };

    return html`<vwc-icon type="${icon}" size="small" class="${classMap(classes)}"></vwc-icon>`;
  }
  
  protected renderRipple(): TemplateResult {
		return html``;
  }

  protected renderLineRipple(): TemplateResult {
    return html``;
  }

  protected renderOutline(): TemplateResult | Record<string, unknown> {
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
