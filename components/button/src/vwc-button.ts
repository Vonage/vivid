import '@vonage/vvd-core';
import { Button as MwcButton } from '@material/mwc-button/mwc-button';
import { customElement } from 'lit-element';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': Button;
  }
}

@customElement('vwc-button')
export class Button extends MwcButton { }
