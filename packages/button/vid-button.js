"use strict";

class VividButton extends HTMLElement {
  constructor() {
    super();

    // Get access to the internal form control APIs
    this._internals = this.attachInternals();
    this.addEventListener("click", this._onClick.bind(this));

    this.shadowRoot.innerHTML = "<h1>Hello world</h1>";
    const style = document.createElement("style");
    style.textContent = "";
    this.shadowRoot.appendChild(style);
  }

  // TODO this can be imported as a decorator
  // and be placed on any component
  get selected() {
    return this._internals.states.contains("selected");
  }

  set selected(flag) {
    this._internals.states.toggle("selected", !!flag);
  }

  _onClick(event) {
    this.selected = !this.selected;

    // Create custom event
    const customEvent = new CustomEvent("selectionChanged", {
      bubbles: true,
      composed: true,
      detail: {
        selected: !!this.selected
      }
    });

    // Dispatch the event.
    this.dispatchEvent(customEvent);
  }
}

customElements.define("vivid-button", VividButton);
