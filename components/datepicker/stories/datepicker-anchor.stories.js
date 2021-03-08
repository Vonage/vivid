import '@vonage/vwc-datepicker';
import '@vonage/vwc-icon-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
  <vwc-textfield id="input" dense></vwc-textfield>
  <vwc-icon-button id="trigger" icon="calendar" layout="filled" @click="${handleOpenDatepicker}"></vwc-icon-button>
  <vwc-datepicker id="datepicker" ...=${spread(args)}></vwc-datepicker>

  <script>
    datepicker.anchor = trigger;
    datepicker.onValueUpdate = () => {
      input[0].value = datepicker.getValue();
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
