import { customElement } from 'lit-element';

import { AnchorBase } from './vwc-anchor.base';
// import { style } from './vwc-anchor.css';

@customElement('vwc-anchor')
export class Anchor extends AnchorBase {
  // static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-anchor': Anchor;
  }
}
// !TODO protect using the _blank noreferer loophole
