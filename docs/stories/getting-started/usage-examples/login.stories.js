import '@vonage/vwc-text';
import '@vonage/vwc-icon';
import '@vonage/vwc-layout';
import '@vonage/vwc-button';
import '@vonage/vwc-textfield';
import '@vonage/vwc-checkbox';

import { html } from 'lit-element';

export default {
	title: 'Getting Started/Usage Examples/Pages',
};

const style = html`
  <style>
			.page {
				display: grid;
				grid-template-columns: 1fr 1fr;
				min-height: 100vh;
			}
			.main {
				background-color: var(--vvd-color-neutral-20);
				display: flex;
				flex-direction: column;
				padding: 0 60px 60px 60px;
			}
			.logo {
				display: flex;
				align-items: center;
			}
			.logo * + * {
				margin-left: 0.5rem;
			}
			.login {
				display: flex;
				flex-direction: column;
			}
			.form {
				margin: auto 0;
				max-width: 550px;
			}
			.side-content{
				margin-top: auto;
			}
      .password {
        text-align: end;
        padding: 8px 0px;
      }
			.button{
				justify-self: flex-start;
			}
  </style>
`;


const sideDrawer = () => html`
  <form class="form">
    <vwc-layout column-basis="block" gutters="xl">
        <vwc-text font-face="title-2" tight>Welcome back!</vwc-text>
        <vwc-text font-face="body-2" tight>Don't have an account? <a href="#">Sign Up</a></vwc-text>
      <div>
        <vwc-layout column-basis="block">
          <vwc-textfield name="username" label="username" icon="user" placeholder=" " outlined="">
            <input value="" slot="formInputElement" class="vivid-input-internal" name="username" type="text"
              placeholder=" " />
          </vwc-textfield>
          <vwc-textfield name="password" label="password" icon="lock" type="password" placeholder=" " outlined="">
            <input value="" slot="formInputElement" class="vivid-input-internal" name="password" type="password"
              placeholder=" " />
          </vwc-textfield>
        </vwc-layout>
      </div>
        <vwc-layout>
          <vwc-formfield label="Remember me">
            <vwc-checkbox></vwc-checkbox>
          </vwc-formfield>
          <vwc-text class="password" font-face="body-2" tight><a href="#">Forgot password?</a></vwc-text>
        </vwc-layout>
			<vwc-button layout="filled" enlarged class="button">Log in</vwc-button>
    </vwc-layout>
  </form>
`;

const content = () => html`<div class="side-content">
	<vwc-layout column-basis="block" gutters="md">
    <vwc-text font-face="subtitle-1" tight>Lorem ipsum</vwc-text>
    <vwc-text font-face="body-1" tight>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</vwc-text>
    <vwc-button label="Apply Now →" layout="outlined" type="submit" outlined="" class="button"></vwc-button>
	</vwc-layout>
	</div>`;

const LogInTemplate = () => html`
  ${style}
	<div class="page">
			<div class="login">
				<div class="logo">
					<vwc-icon type="vonage-mono" size="large"></vwc-icon>
					<vwc-text font-face="subtitle-2" tight> VONAGE</vwc-text>
				</div>
				${sideDrawer()}
			</div>
			<main class="main">
				${content()}
			</main>
	</div>
`;

export const LogIn = LogInTemplate.bind({});
LogIn.args = {};
