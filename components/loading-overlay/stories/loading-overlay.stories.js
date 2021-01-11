import '@vonage/vwc-loading-overlay';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Composite/Loading Overlay',
	component: 'vwc-loading-overlay',
	argTypes
}

const TemplateA = args => html`
	<vwc-loading-overlay ...=${spread(args)}></vwc-loading-overlay>
	<h4>Site content unveiled</h4>
	<p>
		This content in see once the loading overlay is removed.
		In order to see the flow again you may switch to and from the story or reload the whole page.
	</p>
`;

export const DefaultTimings = TemplateA.bind({});

export const RemoveFast = TemplateA.bind({});
RemoveFast.args = { timeout: 2000 };

const TemplateB = args => html`
	<vwc-loading-overlay ...=${spread(args)}>
		<span style="pointer-events: all" @click='${removeOverlay}'>Click to remove overlay</span>
	</vwc-loading-overlay>
	<h4>Site content unveiled</h4>
	<p>
		This content in see once the loading overlay is removed.
		In order to see the flow again you may switch to and from the story or reload the whole page.
	</p>
`;

export const CustomContentWithDelay = TemplateB.bind({});
CustomContentWithDelay.args = { delay: 1000 };

function removeOverlay(e) {
	e.target.parentNode.remove();
}