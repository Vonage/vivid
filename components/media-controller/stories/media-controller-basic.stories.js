import { html } from 'lit-element';
import '@vonage/vwc-media-controller';

export default {
	title: 'Composite/Media Controller',
	component: 'vwc-media-controller'
}

export const basic = () => html`
	<style>
	 	vwc-media-controller { width: 100% }
	</style>
	<h1>Regular</h1>
	<vwc-media-controller></vwc-media-controller>
`;
