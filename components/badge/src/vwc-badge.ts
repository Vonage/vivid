import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { BadgeBase } from './vwc-badge-base.js';
import { style } from './vwc-badge.css.js';

@customElement('vwc-badge')
export class Badge extends BadgeBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-badge': Badge;
  }
}
