import '@vonage/vwc-datepicker/vwc-datepicker.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Components/Composite/Datepicker',
  component: 'vwc-datepicker',
  argTypes
};

const Template = args => html`
  <vwc-datepicker ...=${spread(args)}>
    <vwc-textfield outlined dense icon='calendar' placeholder='dd/mm/yyyy'></vwc-textfield>
  </vwc-datepicker>`;

export const Basic = Template.bind({});
Basic.args = { 
  dateFormat: 'Y-m-d',
  altInput: '',
  altFormat: 'F j, Y'
};
