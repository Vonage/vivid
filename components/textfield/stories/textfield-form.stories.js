import '@vonage/vwc-button';
import '@vonage/vwc-icon';
import '@vonage/vwc-textfield';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const FORM_MODEL = {
	username: '',
	password: ''
};

const Template = args => html`
	<style>
		form {
			display: grid;
			gap: 20px;
		}
	</style>
	<form @submit="${onSubmit}">
		<vwc-textfield ...=${spread(args.username)}></vwc-textfield>
		<vwc-textfield ...=${spread(args.password)}></vwc-textfield>
		<div class="controls">
			<vwc-button layout="outlined" type="reset">Reset</vwc-button>
			<vwc-button layout="filled" type="submit">Submit</vwc-button>
		</div>
		<hr>
		<div>
			<div><span>Username: </span><span>${FORM_MODEL.username}</span></div>
			<div><span>Password: </span><span>${FORM_MODEL.password}</span></div>
		</div>
	</form>
`;

export const LoginForm = Template.bind({});
LoginForm.args = {
	username: { name: 'username', label: 'username', icon: 'user' },
	password: { name: 'password', label: 'password', icon: 'lock', type: 'password' }
};

function onSubmit(e) {
	e.preventDefault();
	const fd = new FormData(e.tartget);
	FORM_MODEL.username = fd.get('username');
	FORM_MODEL.password = fd.get('password');
}