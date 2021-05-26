import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const TemplateBasic = args => html`
	<div style="position: relative">
		<vwc-button layout="filled" @click="${openSurface}">Open surface</vwc-button>
		<vwc-surface ...=${spread(args)}>${args.message}</vwc-surface>
	</div>
`;

export const Basic = TemplateBasic.bind({});
Basic.args = {
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
};

const TemplateAction = args => html`
	<div style="position: relative">
		<vwc-button layout="filled" @click="${openSurface}">Open surface</vwc-button>
		<vwc-surface ...=${spread(args)}>
			<vwc-button slot="action" layout="outlined">Show more</vwc-button>
		</vwc-surface>
	</div>
`;

export const Action = TemplateAction.bind({});
Action.args = {
};

function openSurface(e) {
	const opener = e.target;
	e.target.setAttribute('disabled', '');

	const surface = document.querySelector('vwc-surface');
	surface.anchor = opener;

	surface.addEventListener('closed', () => {
		opener.removeAttribute('disabled');
	}, { once: true });

	surface.show();
}