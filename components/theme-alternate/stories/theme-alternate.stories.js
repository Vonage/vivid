import { COMPONENT_NAME } from '@vonage/vwc-theme-alternate';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import context from '@vonage/vvd-context';
import '@vonage/vwc-banner';
import '@vonage/vwc-badge';
import '@vonage/vwc-button';
import '@vonage/vwc-textfield';

export default {
	title: 'Alpha/Components/Theme Alternate',
	component: COMPONENT_NAME,
};

context.mount(document);

const htmlSample = html`
<style>
	.container {
		padding: 40px 24px;
	}
	vwc-textfield,
	vwc-button {
		width: 100%;
	}
</style>
		<vwc-banner
			dismissible
			open
			connotation="info"
			message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
		></vwc-banner>
		<div class="container">
			<h1>Hello vivid</h1>
			<p>lorem ipsum dolor sit am</p>
			<table>
				<tr>
					<td>
						<vwc-textfield
							label="Username"
							type="email"
							icon="user"
							dense
							shape="pill"
							placeholder="e.g. monkey@zoo.com"
							helper="username or email"
							validationmessage="required field"
							required
							outlined>
						</vwc-textfield>
					</td>
				</tr>
				<tr>
					<td>
						<vwc-textfield
							label="Password"
							type="password"
							icon="lock"
							dense
							shape="pill"
							placeholder="e.g. iLoveB@n@n@s"
							validationmessage="required field"
							required
							outlined>
						</vwc-textfield>
					</td>
				</tr>
				<tr>
					<td>
						My hobbies
						<br>
						<vwc-badge connotation="cta" layout="soft">surf kite</vwc-badge>
						<vwc-badge connotation="info" layout="soft">aerobics</vwc-badge>
						<vwc-badge connotation="alert" layout="soft">backgammon</vwc-badge>
						<vwc-badge connotation="success" layout="soft">long talks</vwc-badge>
					</td>
				</tr>
				<tr>
					<td>
						<vwc-linear-progress
							progress="0.5"
							connotation="pacific"
						></vwc-linear-progress>
					</td>
				</tr>
				<tr>
					<td>
						<vwc-button label="Submit" layout="filled" type="button"></vwc-button>
					</td>
				</tr>
			</table>
		</div>



`;

const Template = args => html`
	<table style="max-width: 1080px;">
		<thead>
			<tr>
				<td>Plain</td>
				<td>Theme Alternate</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>${htmlSample}</td>
				<td>
					<vwc-theme-alternate ...=${spread(args)}>
						${htmlSample}
					</vwc-theme-alternate>
				</td>
			</tr>
		</tbody>
	</table>
`;

export const Basic = Template.bind({});
Basic.args = {};

