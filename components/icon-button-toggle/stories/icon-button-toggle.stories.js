import '@vonage/vwc-icon-button-toggle/vwc-icon-button-toggle.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Icon Button Toggle',
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

export const Outlined = Template.bind({});
Outlined.args = {
	onIcon: 'bookmark-full', offIcon: 'bookmark', layout: 'outlined'
};

export const Connotation = Template.bind({});
Connotation.args = {
	onIcon: 'bookmark-full', offIcon: 'bookmark', layout: 'outlined', connotation: 'cta'
};

export const OnState = Template.bind({});
OnState.args = {
	onIcon: 'bookmark-full', offIcon: 'bookmark', layout: 'filled', connotation: 'success', on: true
};
