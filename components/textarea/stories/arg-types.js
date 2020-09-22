export const argTypes = {
  outlined: {
    control: {
      type: 'inline-radio',
      options: { true: '' },
    },
  },
  dense: {
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
  outlineOpen: { table: { disable: true } },
};
