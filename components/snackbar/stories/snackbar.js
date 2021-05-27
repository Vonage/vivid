import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import '@vonage/vwc-note';
import '@vonage/vwc-radio';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

const TemplateBasic = args => html`
	<div>
		<vwc-button layout="filled" @click="${openSnackbar}">Show snackbar</vwc-button>
	</div>
	<vwc-snackbar ...=${spread(args)}></vwc-snackbar>
`;

export const Basic = TemplateBasic.bind({});
Basic.args = {
	icon: 'megaphone-solid',
	connotation: 'info',
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
};

export const Dismissible = TemplateBasic.bind({});
Dismissible.args = {
	timeoutMs: 10000,
	icon: 'megaphone-solid',
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
	dismissible: true
};

const TemplateAction = args => html`
	<div>
		<vwc-button layout="filled" @click="${openSnackbar}">Show snackbar</vwc-button>
	</div>
	<vwc-snackbar ...=${spread(args)}>
		<vwc-button slot="action" layout="outlined" shape="pill">Show more</vwc-button>
	</vwc-snackbar>
`;

export const Action = TemplateAction.bind({});
Action.args = {
	timeoutMs: 10000,
	icon: 'megaphone-solid',
	connotation: 'success',
	header: 'Pascal heritage',
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.'
};

const TemplateActionWithDismissible = args => html`
	<div>
		<vwc-button layout="filled" @click="${openSnackbar}">Show snackbar</vwc-button>
	</div>
	<vwc-snackbar ...=${spread(args)}>
		<vwc-button slot="action" layout="outlined" shape="pill">Show more</vwc-button>
	</vwc-snackbar>
`;

export const ActionWithDismissible = TemplateActionWithDismissible.bind({});
ActionWithDismissible.args = {
	timeoutMs: 10000,
	icon: 'megaphone-solid',
	connotation: 'success',
	header: 'Pascal heritage',
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
	dismissible: true
};

function openSnackbar(e) {
	const opener = e.target;
	e.target.setAttribute('disabled', '');

	const sb = document.querySelector('vwc-snackbar');
	sb.addEventListener('closed', () => {
		opener.removeAttribute('disabled');
	}, { once: true });

	sb.show();
}