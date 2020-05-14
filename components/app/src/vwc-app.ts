import '@vonage/vvd-core';
import { customElement, LitElement, html } from 'lit-element';
import { style } from './vwc-app.css';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-app': App;
  }
}

@customElement('vwc-app')
export class App extends LitElement {
  static get styles() {
    // return [super.styles /*, theme*/];
    return [
      style,
      /*, theme*/
    ];
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
