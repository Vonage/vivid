import { html } from 'lit-element';

export default {
	title: 'Templates/Log in',
};

export const Template = () => html`
  <style>
      form {
        display: grid;
        gap: 24px;
        margin: auto;
        width: 800px;
      }
      p {
          margin: 0;
          padding: 0;
      }
      .controls {
        display: flex;
        justify-content: start;
        gap: 10px;
      }
      #password {
        text-align: end;
      }
      vwc-inline.sign-in-helper {
	      align-items: center;
      }
	</style>
    <form>
      <p><vwc-text font-face="title-2">Welcome back!</vwc-text></p>
      <p><vwc-text font-face="body-2">Don't have an account? <a href="#">Sign Up</a></vwc-text></p>
      <vwc-textfield
        name="username"
        label="username"
        icon="user"
        placeholder=" "
        outlined=""
      >
        <input
          value=""
          slot="formInputElement"
          class="vivid-input-internal"
          name="username"
          type="text"
          placeholder=" "
        />
      </vwc-textfield>
      <vwc-textfield
        name="password"
        label="password"
        icon="lock"
        type="password"
        placeholder=" "
        outlined=""
      >
        <input
          value=""
          slot="formInputElement"
          class="vivid-input-internal"
          name="password"
          type="password"
          placeholder=" "
        />
      </vwc-textfield>
      <vwc-inline class="sign-in-helper">
        <vwc-formfield label="Remember me"><vwc-checkbox></vwc-checkbox></vwc-formfield>
        <vwc-text id="password" font-face="body-2"><a href="#">Forgot password?</a></vwc-text>
      </vwc-inline>
      <div class="controls">
        <vwc-button layout="filled" type="submit" unelevated="">
          Log in
          <button type="submit" style="display: none;"></button>
        </vwc-button>
      </div>
    </form>
`;


Template.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
