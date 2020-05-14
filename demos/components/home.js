import { html } from 'lit-html';
import Element from '../modules/Element.js';

export default class Home extends Element {
  async getHtml() {
    return html`<section>Home
                    </section>`;
  }
}
