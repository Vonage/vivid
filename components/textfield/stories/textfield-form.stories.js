import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
	<style>
		form {
			display: grid;
			gap: 20px;
		}
	</style>
	<form>
		<vwc-textfield ...=${spread(args.username)}></vwc-textfield>
		<vwc-textfield ...=${spread(args.password)}></vwc-textfield>
	</form>
`;

export const LoginForm = Template.bind({});
LoginForm.args = {
	username: { id: 'username', label: 'username', icon: 'user' },
	password: { id: 'password', label: 'password', type: 'password', icon: 'lock' }
};
