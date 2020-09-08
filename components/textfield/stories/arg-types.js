export const argTypes = {
  dense: {
    control: {
      type: 'inline-radio',
      options: { true: '', false: undefined },
    },
  },
  outlined: {
    control: {
      type: 'inline-radio',
      options: { true: '', false: undefined },
    },
  },
  disabled: {
    control: {
      type: 'inline-radio',
      options: { true: '', false: undefined },
    },
  },
  shape: {
    control: {
      type: 'select',
      options: ['rounded', 'pill'],
    }
  },
  required: {
    control: {
      type: 'inline-radio',
      options: { true: '', false: undefined },
    },
  },
  readOnly: {
    control: {
      type: 'inline-radio',
      options: { true: '', false: undefined },
    },
  },
  ripple: { table: { disable: true } },
};
