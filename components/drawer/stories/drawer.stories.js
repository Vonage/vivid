import '@vonage/vwc-drawer';
import '@vonage/vwc-button';
import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Drawer',
	component: 'vwc-drawer',
	argTypes
}

const Template = args => html`
		<vwc-drawer id="drawer" @MDCDrawer:opened="${handleOpened}" @MDCDrawer:closed="${handleClosed}" ...=${spread(args)}>
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
		</vwc-drawer>`;

export const Basic = Template.bind({});
Basic.args = { hasHeader: '', type: 'dismissible' };

function handleOpened() {
	console.log('MDCDrawer:opened event');
}

function handleClosed() {
	console.log('MDCDrawer:removal event');
}

function handleClick() {
	const drawer = this.closest('#drawer');
	drawer.open = !drawer.open;
	this.textContent = `${drawer.open ? 'Close' : 'Open'} Drawer`;
}
