import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Atoms/Textfield',
  component: 'vwc-textfield',
  argTypes
};

const Template = (args) =>
  html`<vwc-textfield ...=${spread(args)} @keydown=${handleKeyDown} @change=${onChange} @input=${onInput}></vwc-textfield>`;

export const Default = Template.bind({});
Default.args = { label: 'e.g. username' };

export const Outlined = Template.bind({});
Outlined.args = { outlined: '', label: 'e.g. username' };

export const Dense = Template.bind({});
Dense.args = { outlined: '', dense: '' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: '', outlined: '', label: 'Hint test', value: 'Text' };

export const Validation = Template.bind({});
Validation.args = { outlined: '', label: 'Numbers only', required: '', pattern: '[0-9]+', value: 'Text' };

export const Icon = Template.bind({});
Icon.args = { icon: 'search', dense: '', placeholder: 'Search' };

function handleKeyDown(e) {
  e.stopPropagation();
}

function onChange(e) {
  console.log('change');
}

function onInput(e) {
  console.log('input');
}

export const searchField = () => html`
  <h3>Search</h3>
  <vwc-textfield outlined shape="pill" label="Search...">
    <vwc-icon
      title="an icon of magnifying glass"
      size="small"
      type="search"
      slot="icon"
    ></vwc-icon>
  </vwc-textfield>
  <br />
  <vwc-textfield outlined shape="pill" placeholder="Search...">
    <span
      title="an icon of magnifying glass"
      size="small"
      type="search"
      slot="icon"
      >Hi</span
    >
  </vwc-textfield>
`;
