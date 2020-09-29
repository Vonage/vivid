import vvdCore from '@vonage/vvd-core';
import '@vonage/vvd-context';
import '@vonage/vwc-scheme-select';
import '@vonage/vwc-top-app-bar';
import { html } from 'lit-element';

export default {
	title: 'Cells/Context',
};

export const basic = () => html`
  <main>
    <vwc-top-app-bar dense style="position: absolute; left: 0; top: 0;">
      <div slot="title">Example page</div>
      <span slot="actionItems">Choose scheme:</span>
      <vwc-scheme-select slot="actionItems"></vwc-scheme-select>
      <div><!-- content --></div>
    </vwc-top-app-bar>

    <h1>Call Flow (H1)</h1>

    <h2>Overview (H2)</h2>

    <p>
      The Nexmo Voice API handles two types of phone call:
      <b>inbound</b> and <b>outbound</b>.
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
  </main>
`;

vvdCore.settled
	.then(() => console.log('Vivid context initialised for the context demo story'));
