import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
	<style>
		.login-form {
			display: flex;
			flex-direction: column;
		}

		.login-field {
			min-height: 60px;
		}
	</style>
	<form class="login-form">
		<vwc-textfield class="login-field" ...=${spread(args.username)}></vwc-textfield>
		<vwc-textfield class="login-field" ...=${spread(args.password)}></vwc-textfield>
	</form>
`;

export const LoginForm = Template.bind({});
LoginForm.args = {
	username: { id: 'username', label: 'username' },
	password: { id: 'password', label: 'password', type: 'password' }
};
