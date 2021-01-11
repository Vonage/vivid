import '@vonage/vwc-loading-veil';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
	title: 'Components/Composite/Loading Veil',
	component: 'vwc-loading-veil'
}

const TemplateA = args => html`
	<vwc-loading-veil ...=${spread(args)}></vwc-loading-veil>
	<h4>Site content unveiled</h4>
	<p>
		This content in see once the loading veil is removed.
		In order to see the flow again you may switch to and from the story or reload the whole page.
	</p>
`;

export const DefaultTimings = TemplateA.bind({});

export const RemoveFast = TemplateA.bind({});
RemoveFast.args = { timeout: 2000 };

const TemplateB = args => html`
	<vwc-loading-veil ...=${spread(args)}>
		<span style="pointer-events: all" @click='${removeVeil}'>Click to remove veil</span>
	</vwc-loading-veil>
	<h4>Site content unveiled</h4>
	<p>
		This content in see once the loading veil is removed.
		In order to see the flow again you may switch to and from the story or reload the whole page.
	</p>
`;

export const CustomContentWithDelay = TemplateB.bind({});
CustomContentWithDelay.args = { delay: 1000 };

function removeVeil(e) {
	e.target.parentNode.remove();
}