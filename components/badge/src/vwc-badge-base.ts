import { html, LitElement, property } from 'lit-element';
import { Connotation } from '@vonage/vvd-foundation/constants';

export class BadgeBase extends LitElement {
	@property({ type: Boolean, reflect: true }) translucent = false;
	// TODO: extract connotation property to 'foundation'
  @property({ type: String, reflect: true })
  connotation?: Connotation;

  protected render() {
    //  /** @classMap */
    //  const classes = {
    //    'vwc-badge--translucent': this.translucent,
    //  };
    return html` <slot></slot>`;
  }
}
