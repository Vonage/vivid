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
			<vwc-button id="${args.openerId}" layout="filled" @click="${args.opener}">Show snackbar</vwc-button>
		</div>
		<vwc-snackbar ...=${spread(args.snackbarArgs)} legacy></vwc-snackbar>
`;

export const Legacy = TemplateLegacy.bind({});
Legacy.args = {
	snackbarArgs: {
		id: 'snackbar-a',
		icon: 'megaphone',
		connotation: 'info',
		message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.'
	},
	openerId: 'opener-a',
	opener: e => {
		e.target.setAttribute('disabled', '');

		const sb = document.querySelector('#snackbar-a');
		sb.position = getPositionValue();
		sb.addEventListener('closed', () => {
			document.querySelector('#opener-a').removeAttribute('disabled');
		}, { once: true });

		sb.show();
	}
};

export const LegacyDismissible = TemplateLegacy.bind({});
LegacyDismissible.args = {
	snackbarArgs: {
		id: 'snackbar-a',
		timeoutMs: 10000,
		message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
		dismissible: true
	},
	openerId: 'opener-a',
	opener: e => {
		e.target.setAttribute('disabled', '');
		const sb = document.querySelector('#snackbar-a');
		sb.addEventListener('closed', () => {
			document.querySelector('#opener-a').removeAttribute('disabled');
		}, { once: true });
		sb.show();
	}
};

const TemplateLegacyWithAction = args => html`
		<div>
			${getPositionControls()}
			<vwc-button id="${args.openerId}" layout="filled" @click="${args.opener}">Show snackbar</vwc-button>
		</div>
		<vwc-snackbar ...=${spread(args.snackbarArgs)} legacy>
			<vwc-button slot="action" layout="filled">Show more</vwc-button>
		</vwc-snackbar>
`;

export const LegacyFull = TemplateLegacyWithAction.bind({});
LegacyFull.args = {
	snackbarArgs: {
		id: 'snackbar-a',
		timeoutMs: 10000,
		icon: 'megaphone',
		connotation: 'info',
		message: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
		dismissible: true
	},
	openerId: 'opener-a',
	opener: e => {
		e.target.setAttribute('disabled', '');

		const sb = document.querySelector('#snackbar-a');
		sb.position = getPositionValue();
		sb.addEventListener('closed', () => {
			document.querySelector('#opener-a').removeAttribute('disabled');
		}, { once: true });

		sb.show();
	}
};
