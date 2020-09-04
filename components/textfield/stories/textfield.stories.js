import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './argTypes.js';

export default {
  title: 'Atoms/Textfield',
  component: 'vwc-textfield',
  argTypes,
};

const Template = (args) =>
  html`<vwc-textfield ...=${spread(args)}></vwc-textfield>`;

export const Default = Template.bind({});
Default.args = { label: 'e.g. username' };

export const Outlined = Template.bind({});
Outlined.args = { outlined: '', label: 'e.g. username' };

export const Dense = Template.bind({});
Dense.args = { outlined: '', dense: '' };

export const Icon = Template.bind({});
Icon.args = { icon: 'search', placeholder: 'Search' };

export const basic = () => html`
  <style>
    vwc-textfield {
      width: 240px;
    }
  </style>

  <h3>Regular</h3>
  <vwc-textfield
    outlined
    label="VWC textfield"
    @keydown="${handleKeyDown}"
    @change="${onChange}"
    @input="${onInput}"
  ></vwc-textfield>

  <h3>Disabled</h3>
  <vwc-textfield
    outlined
    disabled
    label="Hint text"
    value="Text"
    @keydown="${handleKeyDown}"
  ></vwc-textfield>

  <h3>Validation</h3>
  <vwc-textfield
    outlined
    label="Numbers only"
    required
    pattern="[0-9]+"
    @keydown="${handleKeyDown}"
  ></vwc-textfield>
`;

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
  <style>
    vwc-textfield {
      width: 240px;
    }
  </style>

  <h3>Search</h3>
  <vwc-textfield outlined label="VWC textfield"></vwc-textfield>
  <br />
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
