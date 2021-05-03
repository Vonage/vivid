import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import '@vonage/vwc-note';
import '@vonage/vwc-radio';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';
import { getPositionControls, getPositionValue } from './snackbar.stories.utils';

export default {
	title: 'Alpha/Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

const TemplateLegacy = args => html`
	<div>
		${getPositionControls()}
		<vwc-button layout="filled" @click="${openSnackbar}">Show snackbar</vwc-button>
	</div>
	<vwc-snackbar ...=${spread(args)}></vwc-snackbar>
`;

export const Legacy = TemplateLegacy.bind({});
Legacy.args = {
	icon: 'megaphone',
	connotation: 'info',
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
};

export const LegacyDismissible = TemplateLegacy.bind({});
LegacyDismissible.args = {
	timeoutMs: 10000,
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
	dismissible: true,
	legacy: true
};

const TemplateLegacyAction = args => html`
	<div>
		${getPositionControls()}
		<vwc-button layout="filled" @click="${openSnackbar}">Show snackbar</vwc-button>
	</div>
	<vwc-snackbar ...=${spread(args)}>
		<vwc-button slot="action" layout="filled">Show more</vwc-button>
	</vwc-snackbar>
`;

export const LegacyAction = TemplateLegacyAction.bind({});
LegacyAction.args = {
	timeoutMs: 10000,
	icon: 'megaphone',
	connotation: 'success',
	header: 'Pascal heritage',
	message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
	dismissible: true,
	legacy: true
};

function openSnackbar(e) {
	const opener = e.target;
	e.target.setAttribute('disabled', '');

	const sb = document.querySelector('vwc-snackbar');
	sb.position = getPositionValue();
	sb.addEventListener('closed', () => {
		opener.removeAttribute('disabled');
	}, { once: true });

	sb.show();
}