import context from '@vonage/vvd-context/vvd-context';
import '@vonage/vwc-scheme-select';
import { html } from 'lit-element';

export default {
	title: 'Cells/Context'
};

export const basic = () => html`
	<style>
		body {
			background-color: #eee;
		}

		.app-page-frame {
			padding: 24px;
			background-color: #fff;
			box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
			border-radius: 3px;
		}

		.masthead {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #efefef;
		}
	</style>

	<h3>Example of a static contents styled with Vivid context</h3>
	<div class="app-page-frame">
		<div class="masthead">
			<span>Scheme:</span>
			<vwc-scheme-select></vwc-scheme-select>
		</div>

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
	</dive>
`;

context
	.init()
	.then(() => console.log('Vivid context initialised for the demo story'));