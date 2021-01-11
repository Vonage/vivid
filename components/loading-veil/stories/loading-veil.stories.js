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

export const DefaultDelay = TemplateA.bind({});

export const RemoveFast = TemplateA.bind({});
RemoveFast.args = { delay: 15000, timeout: 3000000 };

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

export const CustomContent = TemplateB.bind({});
CustomContent.args = { delay: 20000, timeout: 200000 };

function removeVeil(e) {
	e.target.parentNode.remove();
}