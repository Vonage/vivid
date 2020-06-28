import '@vonage/vwc-drawer';
import '@vonage/vwc-button';
import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Drawer',
	component: 'vwc-drawer',
	decorators: [withA11y]
}

export const basic = () => html`
	<div style="height: 100vh">
		<vwc-drawer id="drawer" hasHeader type="dismissible">
			<span slot="title">Drawer Title</span>
			<span slot="subtitle">subtitle</span>
			<vwc-list>
				<vwc-list-item>Item 0</vwc-list-item>
				<vwc-list-item>Item 1</vwc-list-item>
				<vwc-list-item>Item 2</vwc-list-item>
				<vwc-list-item>Item 3</vwc-list-item>
			</vwc-list>
			<div slot="appContent">
				<vwc-button slot="navigationIcon" unelevated @click="${handleClick}">Open Drawer</vwc-button>
				<div>
					<p>Main Content</p>
				</div>
			</div>
		</vwc-drawer>
	</div>
`;

function handleClick() {
	drawer.open = !drawer.open;
	this.textContent = `${drawer.open ? 'Close' : 'Open'} Drawer`;
}
