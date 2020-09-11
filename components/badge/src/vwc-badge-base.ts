import { html, LitElement, property } from 'lit-element';
import { Connotation } from '@vonage/vvd-foundation/constants';

export class BadgeBase extends LitElement {
  @property({ type: Boolean, reflect: true }) trancelucent = false;
  @property({ type: String, reflect: true })
  connotation?: Connotation | undefined;

  protected render() {
    //  /** @classMap */
    //  const classes = {
    //    'vwc-badge--trancelucent': this.trancelucent,
    //  };
    return html` <slot></slot>`;
  }
}
