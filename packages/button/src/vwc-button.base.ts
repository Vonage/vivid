import { html, LitElement } from 'lit-element';

export class ButtonBase extends LitElement {
  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  protected render() {
    return html`
      <button>lorem ipsum</button>
    `;
  }
}
