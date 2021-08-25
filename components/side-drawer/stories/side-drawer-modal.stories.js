import { html } from 'lit-element';
import { argTypes } from './arg-types.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { pageContentMock } from '../../../scripts/storybook/svg_templates';
import { Basic } from './side-drawer.stories.js';

export default {
	title: 'Alpha/Components/Side Drawer/Modal',
	component: 'vwc-side-drawer',
	argTypes
};

const Template = args => html`
	<style>
		div#demo {
			top: 0px;
			position: fixed;
			display: flex;
			width: 100%;
			height: 100%;
		}
	</style>
	<div id="demo">
		${Basic(args)}
		${unsafeSVG(pageContentMock('100%', '100%', 'xMinYMin slice'))}
	</div>`;

export const Modal = Template.bind({});
Modal.args = { type: 'modal', open: true };
