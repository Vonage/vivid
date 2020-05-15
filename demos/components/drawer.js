import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-drawer';
import '@vonage/vwc-button';
import '@vonage/vwc-menu';
import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';

export default class Home extends Element {
  async getHtml() {
    return html`
      <div style="position: relative;">
        <vwc-button id="button" raised label="Open Menu" @click="${this.handleClick}"></vwc-button>
        <vwc-menu id="menu">
          <vwc-drawer hasHeader>
            <span slot="title">Drawer Title</span>
            <span slot="subtitle">subtitle</span>
            <vwc-list>
              <vwc-list-item>Item 0</vwc-list-item>
              <vwc-list-item>Item 1</vwc-list-item>
              <vwc-list-item>Item 2</vwc-list-item>
              <vwc-list-item>Item 3</vwc-list-item>
            </vwc-list>
          </vwc-drawer>
        </vwc-menu>
      </div>
    `;
  }

  installed() {
    menu.anchor = button;
  }

  handleClick() {
    menu.open = true;
  }
}
