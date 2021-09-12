import { html } from 'lit-element';

export default {
	title: 'Templates/Log In',
};

export const LogIn = () => html`
  <style>
      vwc-inline.sign-in-helper {
	      align-items: center;
      }
      form {
        margin: 50px;
      }
      .password {
        text-align: end;
      }
      #side-drawer {
        --vvd-side-drawer-min-inline-size: 100%;
        --side-drawer-background-color: var(--vvd-color-neutral-10);
      }
	</style>

  <vwc-side-drawer id="side-drawer" hasTopBar>
    <span slot="top-bar"><vwc-icon type="vonage-mono"></vwc-icon><vwc-text font-face="body-1-bold"> VONAGE</vwc-text></span>
    <form>
      <vwc-inline size="block">
        <section>
            <vwc-text font-face="title-2">Welcome back!</vwc-text>
        </section>
        <section>
            <vwc-text font-face="body-2">Don't have an account? <a href="#">Sign Up</a></vwc-text>
        </section>
        <section>
          <vwc-inline size="block">
            <vwc-textfield name="username" label="username" icon="user" placeholder=" " outlined="">
              <input value="" slot="formInputElement" class="vivid-input-internal" name="username" type="text" placeholder=" "/>
            </vwc-textfield>
            <vwc-textfield name="password" label="password" icon="lock" type="password" placeholder=" " outlined="">
              <input value="" slot="formInputElement" class="vivid-input-internal" name="password" type="password" placeholder=" "/>
            </vwc-textfield>
          </vwc-inline>
        </section>
        <section>
          <vwc-inline class="sign-in-helper">
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
`;

LogIn.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
