import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-app';

export default class Home extends Element {
  async getHtml() {
    return html`
    <vwc-app>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quibusdam, eius
        delectus, officia quae repellat, iure ullam amet voluptate tempora suscipit dignissimos
        error. Maxime explicabo dolorum cumque commodi alias culpa!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quibusdam, eius
        delectus, officia quae repellat, iure ullam amet voluptate tempora suscipit dignissimos
        error. Maxime explicabo dolorum cumque commodi alias culpa!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quibusdam, eius
        delectus, officia quae repellat, iure ullam amet voluptate tempora suscipit dignissimos
        error. Maxime explicabo dolorum cumque commodi alias culpa!
      </p>
    </vwc-app>
    `;
  }
}
