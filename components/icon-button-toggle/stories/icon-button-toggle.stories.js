import '@vonage/vwc-icon-button-toggle/vwc-icon-button-toggle.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/IconButtonToggle',
	component: 'vwc-icon-button-toggle',
	argTypes
};

const Template = args => html`<vwc-icon-button-toggle ...=${spread(args)}></vwc-icon-button-toggle>`;

export const Basic = Template.bind({});
Basic.args = { onIcon: 'bookmark-full', offIcon: 'bookmark' };

export const Dense = Template.bind({});
Dense.args = { onIcon: 'tag-detach-full', offIcon: 'tag-detach', dense: true };

export const Enlarged = Template.bind({});
Enlarged.args = { onIcon: 'separator-full', offIcon: 'separator', enlarged: true };

export const Disabled = Template.bind({});
Disabled.args = { onIcon: 'preferences-full', offIcon: 'preferences', disabled: true };

// on	boolean	false	Whether the toggle is activated.
// onIcon	string	''	Icon to display when on is true.
// offIcon	string	''	Icon to display when on is false.
// label	string	''	Accessible label for the button, sets aria-label.
// disabled