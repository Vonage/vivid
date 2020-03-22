import { html, LitElement } from 'lit-element';
import { buttonMachine } from './vwc-button.machine';
// import { interpret } from 'xstate';

// Machine instance with internal state
// export const buttonService = interpret(buttonMachine)
//   .onTransition(state => console.log(state.value))
//   .start();
// => 'inactive'

// toggleService.send('TOGGLE');
// => 'active'

// toggleService.send('TOGGLE');
// => 'inactive'

export class ButtonBase extends LitElement {
  // static machineService = interpret(buttonMachine)
  //   .onTransition(state => console.log(state.value))
  //   .start();

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  protected render() {
    console.log(buttonMachine);
    // console.log(this.machineService);
    return html`
      <button>lorem ipsum</button>
    `;
  }
}
