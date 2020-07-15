import '@vonage/vwc-button/vwc-button.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Button',
	component: 'vwc-button',
	decorators: [withA11y]
}

export const basic = () => html`
	<style>
		.container {
			display: inline-block;
			padding: 24px;
		}

		.outstanding {
			background-color: #E5E5E5;
		}

		.inverted {
			background-color: #131414;
		}
	</style>

	<h3>Standard</h3>
	<div class="container">
		<vwc-button>Basic</vwc-button>
		<vwc-button layout="text" icon="info">With icon</vwc-button>
		<vwc-button disabled icon="code">Disabled</vwc-button>
	</div>

	<h3>Outlined</h3>
	<div class="container">
		<vwc-button layout="outlined">Basic</vwc-button>
		<vwc-button layout="outlined" icon="info">With icon</vwc-button>
		<vwc-button layout="outlined" disabled icon="code">Disabled</vwc-button>
	</div>

	<h3>Filled</h3>
	<div class="container">
		<vwc-button layout="filled">Normal</vwc-button>
		<vwc-button layout="filled" meaning="call-to-action" icon="info">Call to action</vwc-button>
		<vwc-button layout="filled" meaning="success" icon="code">Success</vwc-button>
		<vwc-button layout="filled" meaning="error" icon="code">Error</vwc-button>
		<vwc-button layout="filled" meaning="warning" icon="info">Warning</vwc-button>
		<vwc-button layout="filled" meaning="warning" disabled icon="code">Disabled</vwc-button>
	</div>

	<h3>Pill shape</h3>
	<div class="container">
		<vwc-button layout="outlined" shape="pill" icon="code">Outlined</vwc-button>
		<vwc-button layout="outlined" disabled shape="pill">Disabled</vwc-button>
		<vwc-button layout="filled" shape="pill" icon="info">Unelevated</vwc-button>
		<vwc-button layout="filled" disabled shape="pill">Disabled</vwc-button>
	</div>
`;