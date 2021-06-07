import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import '@vonage/vwc-theme';
import '@vonage/vwc-theme/vwc-theme-alternate';
import '@vonage/vwc-banner';
import '@vonage/vwc-badge';
import '@vonage/vwc-button';
import '@vonage/vwc-textfield';

const sidenav = html`
	<aside>
  <vwc-list-item
    shape="rounded"
    graphic="icon"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
  >
    <vwc-icon slot="graphic" type="home"></vwc-icon>
    Parent 1
  </vwc-list-item>
  <vwc-list-expansion-panel open="">
    <vwc-list-item
      slot="header"
      shape="rounded"
      graphic="icon"
      mwc-list-item=""
      hasmeta=""
      tabindex="-1"
      aria-disabled="false"
    >
      <vwc-icon slot="graphic" type="profile"></vwc-icon>
      Parent 1
      <vwc-icon slot="meta" type="up"></vwc-icon>
    </vwc-list-item>
    <vwc-list-item
      shape="rounded"
      mwc-list-item=""
      tabindex="-1"
      aria-disabled="false"
    >
      Child 1
    </vwc-list-item>
    <vwc-list-item
      shape="rounded"
      mwc-list-item=""
      tabindex="-1"
      aria-disabled="false"
    >
      Child 2
    </vwc-list-item>
  </vwc-list-expansion-panel>
  <vwc-list-expansion-panel>
    <vwc-list-item
      slot="header"
      shape="rounded"
      graphic="icon"
      mwc-list-item=""
      hasmeta=""
      tabindex="-1"
      aria-disabled="false"
    >
      <vwc-icon slot="graphic" type="gear"></vwc-icon>
      Parent 2
      <vwc-icon slot="meta" type="down"></vwc-icon>
    </vwc-list-item>
    <vwc-list-item
      shape="rounded"
      mwc-list-item=""
      tabindex="-1"
      aria-disabled="false"
    >
      Child 1
    </vwc-list-item>
    <vwc-list-expansion-panel>
      <vwc-list-item
        slot="header"
        shape="rounded"
        mwc-list-item=""
        hasmeta=""
        tabindex="-1"
        aria-disabled="false"
      >
        Child 2
        <vwc-icon slot="meta" type="down"></vwc-icon>
      </vwc-list-item>
      <vwc-list-item
        shape="rounded"
        mwc-list-item=""
        tabindex="-1"
        aria-disabled="false"
      >
        Grand child 1
      </vwc-list-item>
      <vwc-list-item
        shape="rounded"
        mwc-list-item=""
        tabindex="-1"
        aria-disabled="false"
      >
        Grand child 2
      </vwc-list-item>
    </vwc-list-expansion-panel>
  </vwc-list-expansion-panel>
	</aside>
`;

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
	<vwc-theme ...=${spread(args)} scheme="dark">
		<vwc-theme-alternate>
			${sidenav}
		</vwc-theme-alternate>
		${htmlSample}
	</vwc-theme>
`;

export const Alternate = Template.bind({});
Alternate.args = {};

