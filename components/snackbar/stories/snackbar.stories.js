import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

const TemplatePlain = args => html`
		<div>
			<div>Use buttons below to raise the snackbar</div>
			<vwc-button id="${args.openerId}" layout="filled" @click="${args.opener}">Show snackbar</vwc-button>
		</div>
		<vwc-snackbar ...=${spread(args.snackbarArgs)}>
			<vwc-icon slot="dismiss" type="home"></vwc-icon>
		</vwc-snackbar>
`;

export const Basic = TemplatePlain.bind({});
Basic.args = {
	snackbarArgs: {
		id: 'snackbar-a',
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

