import '@vonage/vwc-side-drawer';
import '@vonage/vwc-text';
import '@vonage/vwc-icon';
import '@vonage/vwc-layout';
import '@vonage/vwc-button';
import '@vonage/vwc-textfield';
import '@vonage/vwc-checkbox';

import { html } from 'lit-element';

export default {
	title: 'Getting Started/Usage Examples/Side Drawer',
};

const style = html`
  <style>
      div#login {
        display: flex;
      }
      .password {
        text-align: end;
        padding: 8px 0px;
      }
      vwc-side-drawer#side-drawer {
        --side-drawer-inline-size: 600px;
      }
      main {
        width: 100%;
        position: relative;
        background-color: var(--vvd-color-neutral-20);
      }

      .sb-show-main.sb-main-padded {
			  padding: 0;
		  }
		.login{
			justify-self: flex-start;
		}
		.main {
			display: flex;
			flex-direction: column;
			padding: 0 60px 60px 60px
		}
		.side-content{
			margin-top: auto;
		}
  </style>
`;

const Masthead = () => html`
  <span slot="top-bar">
    <vwc-icon type="vonage-mono"></vwc-icon>
    <vwc-text font-face="body-1-bold"> VONAGE</vwc-text>
  </span>
`;

const sideDrawer = () => html`
<vwc-side-drawer id="side-drawer" hasTopBar>
  ${Masthead()}
  <form>
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
      <div>
        <vwc-layout>
          <vwc-formfield label="Remember me">
            <vwc-checkbox></vwc-checkbox>
          </vwc-formfield>
          <vwc-text class="password" font-face="body-2" tight><a href="#">Forgot password?</a></vwc-text>
        </vwc-layout>
      </div>
			<vwc-button layout="filled" enlarged class="login">Log in</vwc-button>
    </vwc-layout>
  </form>
</vwc-side-drawer>`;

const content = () => html`<div class="side-content">
	<vwc-layout column-basis="block" gutters="md">
    <vwc-text font-face="subtitle-1" tight>Lorem ipsum</vwc-text>
    <vwc-text font-face="body-1" tight>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</vwc-text>
    <vwc-button label="Apply Now →" layout="outlined" type="submit" outlined="" class="login"></vwc-button>
	</vwc-layout>
	</div>`;

const WithLogInTemplate = () => html`
  ${style}
  <div id="login">
    ${sideDrawer()}
    <main class="main">
      ${content()}
    </main>
  </div>
`;

export const WithLogIn = WithLogInTemplate.bind({});
WithLogIn.args = {};
