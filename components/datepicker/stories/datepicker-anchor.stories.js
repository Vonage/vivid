import '@vonage/vwc-datepicker';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-banner';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
  <style>
		html, body {
			height: 100%;
		}
		vwc-note {
			margin-bottom: 1rem;
		}
	</style>

	<vwc-note header="This component is being deprecated!" open icon="warning-solid" connotation="warning">
		We're working on a newer and better solution. Sorry for the inconvenience.
	</vwc-note>
  <vwc-textfield id="input" dense></vwc-textfield>
  <vwc-icon-button id="trigger" icon="calendar" layout="filled" @click="${handleOpenDatepicker}"></vwc-icon-button>
  <vwc-datepicker id="datepicker" ...=${spread(args)}></vwc-datepicker>

  <script>
    datepicker.anchor = trigger;
    datepicker.onValueUpdate = () => {
      input.value = datepicker.getValue();
    };
  </script>

  <pre><code class="js language-js">
    trigger.onclick = () => datepicker.open();

    datepicker.anchor = trigger;
    datepicker.onValueUpdate = () => {
      input.value = datepicker.getValue();
    };
  </code></pre>
`;

export const Anchor = Template.bind({});
Anchor.args = { closeOnSelect: '' };

function handleOpenDatepicker() {
  datepicker.open();
}
