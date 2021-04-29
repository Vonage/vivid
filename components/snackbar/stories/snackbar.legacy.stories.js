import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import '@vonage/vwc-note';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

const TemplateLegacy = args => html`
		<div>
			<div>Use buttons below to raise the snackbar</div>
			<vwc-button id="${args.openerId}" layout="filled" @click="${args.opener}">Show snackbar</vwc-button>
		</div>
		<vwc-snackbar ...=${spread(args.snackbarArgs)} legacy>
			<vwc-note icon="megaphone" connotation="info">
				${args.snackbarArgs.labelText}
			</vwc-note>
		</vwc-snackbar>
`;

export const Legacy = TemplateLegacy.bind({});
Legacy.args = {
	snackbarArgs: {
		id: 'snackbar-a',
		timeoutMs: 10000,
		labelText: 'Pascal argues that a rational person should live as though God exists and seek to believe in God.',
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

