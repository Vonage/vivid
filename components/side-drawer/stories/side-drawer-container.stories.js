import '@vonage/vwc-side-drawer';
import '@vonage/vwc-top-app-bar';
import { html } from 'lit-element';

export default {
	title: 'Templates/Side Drawer',
};

const loremIpsum = () => html`
	<p>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
	</p>
`;

const content = () => Array(8).fill().map(loremIpsum);

export const WithTopAppBar = () => html`
	<style>
		margin: 0;
		padding: 0;
	</style>
	<vwc-side-drawer alternate hastopbar>
			<span slot="top-bar">Side drawer top bar</span>
			Should top bar font face differ from body?
			${content()}

			<vwc-top-app-bar slot="app-content">
			  <span slot="title">Main top bar</span>
				<main>
					${content()}
				</main>
			</vwc-top-app-bar>
		</vwc-side-drawer>
`;
