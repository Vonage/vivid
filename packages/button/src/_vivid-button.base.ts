import { html, LitElement, property, query } from 'lit-element';

export class ButtonBase extends LitElement {
  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  protected render() {
    return html`
      <button>Hello World</button>
    `;
  }
}
