import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Button as MwcButton } from '@material/mwc-button/mwc-button';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': VwcButton;
  }
}

@customElement('vwc-button')
export class VwcButton extends MwcButton { }
