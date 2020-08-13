import '@vonage/vwc-button/vwc-button.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
  title: 'Atoms/Button',
  component: 'vwc-button',
  argTypes: { 
    connotation: {
      control: {
        type: 'select',
        options: [undefined, 'cta', 'success', 'error', 'warning'],
      }
    }
  }
};

const Template = args => html`<vwc-button ...=${spread(args)}></vwc-button>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic' };

export const Filled = Template.bind({});
Filled.args = { layout: 'filled', label: 'Filled' };

export const Outlined = Template.bind({});
Outlined.args = { label: 'Outlined', layout: 'outlined' };

export const PillShape = Template.bind({});
PillShape.args = { label: 'Filled', layout: 'filled', shape: 'pill' };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Disabled', layout: 'filled', disabled: true };

// export const Basic = (args) => {
//   console.log(args);
//   return html`<vwc-button ...=${spread(args)}>Basic</vwc-button>`;
// };
// Basic.args = { label: 'hello' };

// export const basic = () => html`
//   <style>
//     .container {
//       display: inline-block;
//       padding: 24px;
//     }
//   </style>

//   <h3>Standard</h3>
//   <div class="container">
//     <vwc-button>Basic</vwc-button>
//     <vwc-button layout="text" icon="info">With icon</vwc-button>
//     <vwc-button disabled icon="code">Disabled</vwc-button>
//   </div>

//   <h3>Outlined</h3>
//   <div class="container">
//     <vwc-button layout="outlined">Basic</vwc-button>
//     <vwc-button layout="outlined" icon="info">With icon</vwc-button>
//     <vwc-button layout="outlined" disabled icon="code">Disabled</vwc-button>
//   </div>

//   <h3>Filled</h3>
//   <div class="container">
//     <vwc-button layout="filled">Normal</vwc-button>
//     <vwc-button layout="filled" connotation="cta" icon="info"
//       >Call to action</vwc-button
//     >
//     <vwc-button layout="filled" connotation="success" icon="code"
//       >Success</vwc-button
//     >
//     <vwc-button layout="filled" connotation="error" icon="code"
//       >Error</vwc-button
//     >
//     <vwc-button layout="filled" connotation="warning" icon="info"
//       >Warning</vwc-button
//     >
//     <vwc-button layout="filled" connotation="warning" disabled icon="code"
//       >Disabled</vwc-button
//     >
//   </div>

//   <h3>Pill shape</h3>
//   <div class="container">
//     <vwc-button layout="outlined" shape="pill" icon="code">Outlined</vwc-button>
//     <vwc-button layout="outlined" disabled shape="pill">Disabled</vwc-button>
//     <vwc-button layout="filled" shape="pill" icon="info">Unelevated</vwc-button>
//     <vwc-button layout="filled" disabled shape="pill">Disabled</vwc-button>
//   </div>
// `;
