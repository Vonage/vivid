import { html } from 'lit-element';

export default {
	title: 'Templates/Log In',
};

export const Login = () => html`
  <style>
    html {
      block-size: 100%;
    }
    body {
      min-block-size: 100%;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-content: center;
      grid-auto-flow: dense;
    }
  </style>
  <vwc-side-drawer>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti voluptate rem velit accusantium quasi, aliquid natus, aperiam officiis repellendus reprehenderit sapiente commodi cum deserunt quae illo blanditiis. Quasi, ullam totam.</p>
  </vwc-side-drawer>
  <main>
    <h2>Main</h2>
    <p>
      This demonstrates basic support for application with <code>vwc-side-drawer</code>.
    </p>
  </main>
`;

Login.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
