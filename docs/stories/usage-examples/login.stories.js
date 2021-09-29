import { html } from 'lit-element';

export default {
	title: 'Usage Examples/Log In',
};

export const LogIn = () => html`
<style>
    div#login {
      display: flex;
    }
    .password {
      text-align: end;
      padding: 8px 0px;
    }
    vwc-side-drawer#side-drawer {
      --side-drawer-min-inline-size: 600px;
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
</style>

<div id="login">
  <vwc-side-drawer id="side-drawer" hasTopBar>
    <span slot="top-bar"><vwc-icon type="vonage-mono"></vwc-icon><vwc-text font-face="body-1-bold"> VONAGE</vwc-text></span>
    <form>
      <vwc-inline column-basis="block" inline-gutters="xl">
        <section>
            <vwc-text font-face="title-2">Welcome back!</vwc-text>
        </section>
        <section>
            <vwc-text font-face="body-2">Don't have an account? <a href="#">Sign Up</a></vwc-text>
        </section>
        <section>
          <vwc-inline column-basis="block" inline-gutters="">
            <vwc-textfield name="username" label="username" icon="user" placeholder=" " outlined="">
              <input value="" slot="formInputElement" class="vivid-input-internal" name="username" type="text" placeholder=" "/>
            </vwc-textfield>
            <vwc-textfield name="password" label="password" icon="lock" type="password" placeholder=" " outlined="">
              <input value="" slot="formInputElement" class="vivid-input-internal" name="password" type="password" placeholder=" "/>
            </vwc-textfield>
          </vwc-inline>
        </section>
        <section>
          <vwc-inline inline-gutters="">
            <vwc-formfield label="Remember me"><vwc-checkbox></vwc-checkbox></vwc-formfield>
            <vwc-text class="password" font-face="body-2"><a href="#">Forgot password?</a></vwc-text>
          </vwc-inline>
        </section>
        <section>
            <vwc-button layout="filled">Log in</vwc-button>
        </section>
      </vwc-inline>
    </form>
  </vwc-side-drawer>

  <main>
      <vwc-inline id="content" column-basis="block">
          <section><vwc-text font-face="subtitle-1">Lorem ipsum</vwc-text></section>
          <section><vwc-text font-face="body-1">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</vwc-text></section>
          <section><vwc-button label="Apply Now →" layout="outlined" type="submit" outlined=""></vwc-button></section>
      </vwc-inline>
  </main>
</div>
`;

LogIn.parameters = {
	options: {
		showPanel: true,
		isToolshown: false
	}
};
