import '@vonage/vwc-datepicker';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
  <style>
    vwc-textfield { width: 260px; }
  </style>
  <vwc-datepicker id="datepicker" ...=${spread(args)}>
    <vwc-textfield dense icon='calendar' placeholder='Datepicker'></vwc-textfield>
  </vwc-datepicker>

  <script>
    datepicker.onChange = () => {
      const weekNumber = datepicker.getSelectedDates()[0]
        ? datepicker.getConfig().getWeek(datepicker.getSelectedDates()[0])
        : null;

      console.log(weekNumber);
    };
  </script>

  <pre><code class="js language-js">
    datepicker.onChange = () => {
      const weekNumber = datepicker.getSelectedDates()[0]
        ? datepicker.getConfig().getWeek(datepicker.getSelectedDates()[0])
        : null;

      console.log(weekNumber);
    };
  </code></pre>
`;

export const WeekSelect = Template.bind({});
WeekSelect.args = { weekSelect: '' };
