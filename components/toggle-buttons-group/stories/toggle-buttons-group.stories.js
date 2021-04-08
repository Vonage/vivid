import '@vonage/vwc-toggle-buttons-group/vwc-toggle-buttons-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Toggle-buttons-group',
	component: 'vwc-toggle-buttons-group',
	argTypes
};

const Template = args => html`<vwc-toggle-buttons-group ...=${spread(args)}>
	<vwc-button label="Option 1" layout="filled"></vwc-button>
	<vwc-button label="Option 2" layout="filled"></vwc-button>
	<vwc-button label="Option 3" layout="filled"></vwc-button>
</vwc-toggle-buttons-group>`;

export const Basic = Template.bind({});
Basic.args = { };
