import context from '@vonage/vvd-context/vvd-context';
import '@vonage/vwc-scheme-select';
import '@vonage/vwc-top-app-bar';
import { html } from 'lit-element';

export default {
  title: 'Cells/Context',
};

export const basic = () => html`
  <main>
    <vwc-top-app-bar dense style="position: absolute; left: 0; top: 0;">
      <div slot="title">Example page</div>
      <span slot="actionItems">Choose scheme:</span>
      <vwc-scheme-select slot="actionItems"></vwc-scheme-select>
      <div><!-- content --></div>
    </vwc-top-app-bar>

    <h1>Call Flow (H1)</h1>

    <h2>Overview (H2)</h2>

    <p>
      The Nexmo Voice API handles two types of phone call:
      <b>inbound</b> and <b>outbound</b>.
    </p>

    <p>
      <b>Inbound</b> calls are calls made to a Nexmo number from another regular
      phone anywhere in the world.
    </p>

    <p>
      <b>Outbound</b> calls are calls made from the Nexmo platform to a regular
      phone number. Outbound calls are usually initiated in response to a
      request made via the REST API to create a new call. Outbound calls may
      also be made from within the call flow of an existing call (either inbound
      or outbound) using the <code>connect</code> action within the NCCO (Nexmo
      Call Control Object). This scenario is generally used for forwarding
      calls.
    </p>

    <h2>Checkboxes and radios</h2>
    <div>
      <label><input type="checkbox" />Sign me up!</label>
    </div>
    <div>
      <label><input name="a" type="radio" />Mango</label>
      <label><input name="a" type="radio" />Peach</label>
    </div>
    <h2>Actions</h2>
    <div>
      <button>Click to do something!</button>
    </div>
    <h2>Editable text</h2>
    <div>
      <input placeholder="Single line" />
    </div>
    <div>
      <textarea placeholder="Multi line"></textarea>
    </div>
    <div>
      <div contenteditable>Contenteditable</div>
    </div>
    <h2>Selects</h2>
    <label
      >Select one from drop-down:<br />
      <select>
        <option>Apple</option>
        <option>Orange</option>
        <option>Banana</option>
      </select>
    </label>
    <label
      >Select multiple:<br />
      <select multiple="">
        <option>Apple</option>
        <option>Orange</option>
        <option>Banana</option>
      </select>
    </label>
    <h2>Navigation</h2>
    <div>
      <a href="google.com">Google.com</a>
    </div>
    <h2>Other</h2>
    <label
      >Range from 0 to 10:<br />
      <input type="range" min="0" max="10" value="0" />
    </label>
    <div>
      <input type="date" value="2008-09-01" />
    </div>
    <div>
      <input type="time" value="00:00:00" />
    </div>
    <div>
      <input type="number" placeholder="Number" />
    </div>
    <div>
      <input type="color" title="Color" value="#00ff00" />
    </div>
    <div>
      <input type="file" title="File" />
    </div>
  </main>
`;

context
  .init()
  .then(() => console.log('Vivid context initialised for the demo story'));
