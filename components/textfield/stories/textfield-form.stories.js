import '@vonage/vwc-button';
import '@vonage/vwc-icon';
import '@vonage/vwc-textfield';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
	<style>
		form {
			display: grid;
			gap: 20px;
		}
		.controls {
			display: flex;
			justify-content: flex-end;
			gap: 10px;
		}
	</style>
	<form @submit="${onSubmit}">
		<vwc-textfield ...=${spread(args.username)}></vwc-textfield>
		<vwc-textfield ...=${spread(args.password)}></vwc-textfield>
		<div class="controls">
			<vwc-button layout="outlined" type="reset">Reset</vwc-button>
			<vwc-button layout="filled" type="submit">Submit</vwc-button>
		</div>
		<div>
			<div><span>Username: </span><span id="username-view"></span></div>
			<div><span>Password: </span><span id="password-view"></span></div>
		</div>
	</form>
`;

export const LoginForm = Template.bind({});
LoginForm.args = {
	username: { name: 'username', label: 'username', icon: 'user' },
	password: { name: 'password', label: 'password', icon: 'lock', type: 'password' },
	model: {
		username: '',
		password: ''
	}
};

function onSubmit(e) {
	e.preventDefault();
	const fd = new FormData(e.target);
	document.getElementById('username-view').textContent = fd.get('username');
	document.getElementById('password-view').textContent = fd.get('password');
}