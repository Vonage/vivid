import '@vonage/vwc-frame/vwc-frame.js';
import { html } from 'lit-element';

export default {
  title: 'Cells/Frame',
  component: 'vwc-frame',
};

export const basic = () => html`
  <vwc-frame>
    <h1>Call Flow (H1)</h1>

    <h2>Overview (H2)</h2>

    <p>
      The Nexmo Voice API handles two types of phone call: <b>inbound</b> and
      <b>outbound</b>.
    </p>

    <p>
      <b>Inbound</b> calls are calls made to a Nexmo number from another regular
      phone anywhere in the world.
    </p>

    <p>
      <b>Outbound</b> calls are calls made from the Nexmo platform to a regular
      phone number. Outbound calls are usually initiated in response to a
      request made via the REST API to create a new call. Outbound calls may
      also be made from within the call flow of an existing call (either inbound
      or outbound) using the <code>connect</code> action within the NCCO (Nexmo
      Call Control Object). This scenario is generally used for forwarding
      calls.
    </p>
  </vwc-frame>
`;
