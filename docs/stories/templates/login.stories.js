import { html } from 'lit-element';

export default {
	title: 'Templates/Log In',
};

export const LogIn = () => html`
  <style>
      form {
        display: grid;
        gap: 24px;
        min-width: 600px;
      }
      section {
        margin: 50px;
      }
      .vivid-scope h3, p{
          margin: 0;
          padding: 0;
      }
      .actions {
        display: flex;
        justify-content: start;
        gap: 10px;
      }
      vwc-inline.sign-in-helper {
	      align-items: center;
      }
      .password {
        text-align: end;
      }
      #side-drawer {
        flex: 1 0;
        --vvd-side-drawer--background-color: var(--vvd-color-canvas);
        --vvd-side-drawer--min-inline-size: 100%;
      }
	</style>
    <vwc-side-drawer id="side-drawer" hasTopBar>
      <span slot="top-bar"><vwc-icon type="vonage-mono"></vwc-icon><vwc-text font-face="body-1-bold"> VONAGE</vwc-text></span>
      <section>
      <form>
        <h3><vwc-text font-face="title-2">Welcome back!</vwc-text></h3>
        <p><vwc-text font-face="body-2">Don't have an account? <a href="#">Sign Up</a></vwc-text></p>
        <vwc-textfield name="username" label="username" icon="user" placeholder=" " outlined="">
          <input value="" slot="formInputElement" class="vivid-input-internal" name="username" type="text" placeholder=" "/>
        </vwc-textfield>
        <vwc-textfield name="password" label="password" icon="lock" type="password" placeholder=" " outlined="">
          <input value="" slot="formInputElement" class="vivid-input-internal" name="password" type="password" placeholder=" "/>
        </vwc-textfield>
        <vwc-inline class="sign-in-helper">
          <vwc-formfield label="Remember me"><vwc-checkbox></vwc-checkbox></vwc-formfield>
          <vwc-text class="password" font-face="body-2"><a href="#">Forgot password?</a></vwc-text>
        </vwc-inline>
        <footer class="actions">
          <vwc-button layout="filled">Log in</vwc-button>
        </footer>
      </form>
      </section>
    </vwc-side-drawer>
`;

LogIn.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
