import { createMachine } from 'xstate';

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
export const buttonMachine = createMachine({
  id: 'button',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});
