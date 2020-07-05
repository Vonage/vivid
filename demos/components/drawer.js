import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-drawer';
import '@vonage/vwc-button';
import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';

export default class Home extends Element {
  async getHtml() {
    return html`
      <div style="position: relative; height: 100vh">
        <vwc-drawer id="drawer" hasHeader type="dismissible">
          <span slot="title">Drawer Title</span>
          <span slot="subtitle">subtitle</span>
          <vwc-list>
            <vwc-list-item>Item 0</vwc-list-item>
            <vwc-list-item>Item 1</vwc-list-item>
            <vwc-list-item>Item 2</vwc-list-item>
            <vwc-list-item>Item 3</vwc-list-item>
          </vwc-list>
          <div slot="appContent">
            <vwc-button slot="navigationIcon" unelevated @click="${this.handleClick}">Open Drawer</vwc-button>
            <div>
              <p>Main Content!</p>
            </div>
          </div>
        </vwc-drawer>
      </div>
    `;
  }

  handleClick() {
    drawer.open = !drawer.open;
  }
}
