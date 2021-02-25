import '@vonage/vwc-datepicker';
import '@vonage/vwc-icon-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
  <vwc-textfield id="input" dense></vwc-textfield>
  <vwc-icon-button id="trigger" icon="calendar" layout="filled" @click="${handleOpenDatepicker}"></vwc-icon-button>
  <vwc-datepicker id="datepicker" ...=${spread(args)}></vwc-datepicker>

  <script>
    const input = document.querySelector('#input');
    const datepicker = document.querySelector('#datepicker');

    datepicker.positionElement = document.querySelector('#trigger');
    datepicker.onValueUpdate = () => {
      input.value = datepicker.getValue();
    };
  </script>

  <pre><code class="js language-js">
    const input = document.querySelector('#input');
    const datepicker = document.querySelector('#datepicker');

    datepicker.positionElement = document.querySelector('#trigger');
    datepicker.onValueUpdate = () => {
      input.value = datepicker.getValue();
    };
  </code></pre>
`;

export const Position = Template.bind({});
Position.args = { closeOnSelect: '' };

function handleOpenDatepicker() {
  const datepicker = document.querySelector('#datepicker');
  datepicker.open();
}
