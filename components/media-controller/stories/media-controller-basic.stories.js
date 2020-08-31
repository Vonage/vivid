import { html } from 'lit-element';
import '@vonage/vwc-media-controller-yonatan';

export default {
	title: 'Media Controller',
	component: 'vwc-media-controller-yonatan'
}

export const basic = () => html`
	<style>
	 	vwc-media-controller-yonatan { width: 100% }
	</style>
	<h1>Regular</h1>
	<vwc-media-controller-yonatan></vwc-media-controller-yonatan>
`;
