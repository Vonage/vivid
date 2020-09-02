import '@vonage/vwc-switch/vwc-switch.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Switch',
	component: 'vwc-switch'
}

export const basic = () => html`
	<h3>Default</h3>
  <vwc-switch></vwc-switch>
  <vwc-switch checked></vwc-switch>

  <h3>Disabled</h3>
  <vwc-switch disabled></vwc-switch>
  <vwc-switch checked disabled></vwc-switch>

  <h3>Enlarged</h3>
  <vwc-switch enlarged></vwc-switch>
  <vwc-switch checked enlarged></vwc-switch>
`;
