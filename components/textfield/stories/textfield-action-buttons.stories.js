import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon-button';
import { html } from 'lit';

export const Actions = () => html`
		<style>
			vwc-textfield { width: 250px; }
			dt {
				margin-block-start: 10px;
			}
			dd {
				margin: 0;
			}
		</style>
		<dl>
			<dt>Base</dt>
			<dd>
				<vwc-textfield value="lorem ipsum dolor amet, consectetur adipiscing elit" label="Send message...">
					<vwc-icon-button type="button" icon="image-line" aria-label="Add Photo or Video" slot="action"></vwc-icon-button>
					<vwc-icon-button icon="message-sent-line" aria-label="Send Message" slot="action"></vwc-icon-button>
				</vwc-textfield>
			</dd>
			<dt>Pilled</dt>
			<dd>
				<vwc-textfield value="lorem ipsum dolor amet, consectetur adipiscing elit" placeholder="Send message..." shape="pill">
					<vwc-icon-button type="button" icon="image-line" aria-label="Add Photo or Video" slot="action"></vwc-icon-button>
					<vwc-icon-button icon="message-sent-line" aria-label="Send Message" slot="action"></vwc-icon-button>
				</vwc-textfield>
			</dd>
			<dt>Decorative</dt>
			<dd>
				<vwc-textfield value="lorem ipsum dolor amet, consectetur adipiscing elit" placeholder="Send message..."	shape="pill"	icon="heart-line"	iconTrailing="compose-line">
					<vwc-icon-button type="button" icon="image-line" aria-label="Add Photo or Video" slot="action"></vwc-icon-button>
					<vwc-icon-button icon="message-sent-line" aria-label="Send Message" slot="action"></vwc-icon-button>
				</vwc-textfield>
			</dd>
			<dt>Disabled</dt>
			<dd>
				<vwc-textfield value="lorem ipsum dolor amet, consectetur adipiscing elit" placeholder="Send message..."	shape="pill"	icon="heart-line"	iconTrailing="block-line" disabled>
					<vwc-icon-button type="button" icon="image-line" aria-label="Add Photo or Video" slot="action"></vwc-icon-button>
					<vwc-icon-button icon="message-sent-line" aria-label="Send Message" slot="action"></vwc-icon-button>
				</vwc-textfield>
			</dd>
		</dl>
	`;
