import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = (args) =>
	html`<vwc-textfield ...=${spread(args)}>
	<vwc-icon-button type="button" icon="image-line" aria-label="Add Photo or Video" slot="action"></vwc-icon-button>
	<vwc-icon-button icon="message-sent-line" aria-label="Send Message" slot="action"></vwc-icon-button></vwc-textfield>
	`;

export const Actions = Template.bind({});
Actions.args = { label: 'e.g. username', value: 'Initial value', placeholder: 'Placeholder' };
