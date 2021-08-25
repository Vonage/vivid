/* eslint-disable lit-a11y/anchor-is-valid */
import { html } from 'lit-element';

export default {
	title: 'Templates/Log in',
};

export const Template = () => html`
  <style>
    	div#demo {
        width: 100%;
        height: 100%;
        display: flex;
		  }
      form {
        display: grid;
        gap: 20px;
        margin: auto;
      }
      .controls {
        display: flex;
        justify-content: start;
        gap: 10px;
      }
      #password {
        display: flex;
      }
      #remember {
        flex: 1 0;
      }
      #forgot {
        flex: 0 0 50vw;
        padding-top: 20px;
      }
	</style>
  <div id="demo">
    <form>
      <p><vwc-text font-face="title-2">Welcome back!</vwc-text></p>
      <p><vwc-text font-face="body-2">Don't have an account? <a href="">Sign Up</a></vwc-text></p>
      <div>
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
      <div id="password">
        <vwc-formfield id="remember" label="Remember me"><vwc-checkbox></vwc-checkbox></vwc-formfield>
        <vwc-text id="forgot" font-face="body-2"><a href="">Forgot password?</a></vwc-text>
      </div>
      </div>
      <div class="controls">
        <vwc-button layout="filled" type="submit" unelevated="">
          Log in
          <button type="submit" style="display: none;"></button>
        </vwc-button>
      </div>
    </form>
  </div>
`;


Template.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
