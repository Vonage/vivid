import {render} from 'lit-html';

export default class Element extends HTMLElement {
  // Element is connected
  async connectedCallback() {
    this.install.apply(this);

    this.beforeRender();
    const element = await this.getHtml();
    render(element,this);

    this.installed();
  }

  // Element is removed
  disconnectedCallback() {
    this.uninstall();
  }

  // Update element
  async update() {
    const element = await this.getHtml();
    this.beforeUpdate();
    render(element,this.lastChild);
    this.afterUpdate();
  }

  // You can use these function to run your functions between component state changes, like with react.js
  install() {}

  installed() {}

  uninstall() {}

  beforeUpdate() {}

  afterUpdate() {}

  beforeRender() {}
}
