import { html } from 'lit-element';
import '@vonage/vwc-audio';

export default {
	title: 'Audio Player',
	component: 'vwc-audio'
}

export const basic = () => html`
	<style>
	 	vwc-audio { width: 100% }
	</style>
	<h1>Regular</h1>
	<vwc-audio></vwc-audio>
	<h1>No Seek</h1>
	<vwc-audio noseek="true"></vwc-audio>
`;