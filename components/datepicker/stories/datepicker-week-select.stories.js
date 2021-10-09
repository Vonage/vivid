import '@vonage/vwc-datepicker';
import '@vonage/vwc-note';
import { html } from 'lit';
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
  <vwc-datepicker id="datepicker" ...=${spread(args)}></vwc-datepicker>
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
WeekSelect.args = { weekSelect: '', inline: '' };
