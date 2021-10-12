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
      #content {
        position: absolute;
        bottom: 20px;
        left: 20px;
      }
      .sb-show-main.sb-main-padded {
			  padding: 0;
		  }
  </style>
`;

const sideDrawer = () => html`<vwc-side-drawer id="side-drawer" hasTopBar>
  <span slot="top-bar">
    <vwc-icon type="vonage-mono"></vwc-icon>
    <vwc-text font-face="body-1-bold"> VONAGE</vwc-text>
  </span>
  <form>
    <vwc-layout column-basis="block" gutters="xl">
      <section>
        <vwc-text font-face="title-2">Welcome back!</vwc-text>
      </section>
      <section>
        <vwc-text font-face="body-2">Don't have an account? <a href="#">Sign Up</a></vwc-text>
      </section>
      <section>
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
      </section>
      <section>
        <vwc-layout>
          <vwc-formfield label="Remember me">
            <vwc-checkbox></vwc-checkbox>
          </vwc-formfield>
          <vwc-text class="password" font-face="body-2"><a href="#">Forgot password?</a></vwc-text>
        </vwc-layout>
      </section>
      <section>
        <vwc-button layout="filled">Log in</vwc-button>
      </section>
    </vwc-layout>
  </form>
</vwc-side-drawer>`;

const content = () => html`<vwc-layout id="content" column-basis="block">
  <section>
    <vwc-text font-face="subtitle-1">Lorem ipsum</vwc-text>
  </section>
  <section>
    <vwc-text font-face="body-1">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</vwc-text>
  </section>
  <section>
    <vwc-button label="Apply Now →" layout="outlined" type="submit" outlined=""></vwc-button>
  </section>
</vwc-layout>`;

const WithLogInTemplate = () => html`
  ${style}
  <div id="login">
    ${sideDrawer()}
    <main>
      ${content()}
    </main>
  </div>
`;

export const WithLogIn = WithLogInTemplate.bind({});
WithLogIn.args = {};