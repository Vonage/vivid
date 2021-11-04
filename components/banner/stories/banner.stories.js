import '@vonage/vwc-banner';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
	title: 'Components/Banner',
};

const Template = args => html`
<vwc-banner ...=${spread(args)} connotation="info" message=${infoMessage}></vwc-banner>
<vwc-banner ...=${spread(args)} connotation="announcement" message=${announcementMessage}></vwc-banner>
<vwc-banner ...=${spread(args)} connotation="success" message=${successMessage}></vwc-banner>
<vwc-banner ...=${spread(args)} connotation="warning" message=${warningMessage}></vwc-banner>
<vwc-banner ...=${spread(args)} connotation="alert" message=${alertMessage}></vwc-banner>
`;

const TemplateWithButton = args => html`
<vwc-banner ...=${spread(args)} connotation="info" message=${infoMessage}>${learMoreButton}</vwc-banner>
<vwc-banner ...=${spread(args)} connotation="announcement" message=${announcementMessage}>${learMoreButton}</vwc-banner>
<vwc-banner ...=${spread(args)} connotation="success" message=${successMessage}>${learMoreButton}</vwc-banner>
<vwc-banner ...=${spread(args)} connotation="warning" message=${warningMessage}>${learMoreButton}</vwc-banner>
<vwc-banner ...=${spread(args)} connotation="alert" message=${alertMessage}>${learMoreButton}</vwc-banner>
`;


export const Default = Template.bind({});
Default.args = { open: true };

export const Button = TemplateWithButton.bind({});
Button.args = { open: true };

export const Dismissible = Template.bind({});
Dismissible.args = { open: true, dismissible: true };

export const Icon = Template.bind({});
Icon.args = { open: true, icon: 'profile-line' };

const infoMessage = "I'm here to give you advice (Like, use the controls for options)";
const announcementMessage = "I'm here to give you some info (Terms and Conditions changed... jk)";
const successMessage = "I'm here to give you good news (Thanks for giving us money!)";
const warningMessage = "I'm here to give you a warning (Your zip is down)";
const alertMessage = "I'm here to tell you something's wrong (The horror, the horror)";

const learMoreButton = html`<vwc-button slot="actionItems" layout="filled" dense type="submit" unelevated>Learn More</vwc-button>`;

