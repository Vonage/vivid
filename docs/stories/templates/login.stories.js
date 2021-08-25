/* eslint-disable lit-a11y/anchor-is-valid */
import { html } from 'lit-element';

export default {
	title: 'Templates/Log in',
};

export const Template = () => html`
  <div>
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
      <vwc-formfield label="Remember me">
        <vwc-checkbox></vwc-checkbox>
      </vwc-formfield>
      <p><vwc-text font-face="body-2"><a href="">Forgot password?</a></vwc-text></p>
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
