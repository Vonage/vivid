import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-scheme-select';

export default class Scheme extends Element {
  async getHtml() {
    return html`
      <dl>
        <dt>
          should be placed in the head tag
        </dt>
        <dd>
          <code-sample copy-clipboard-button>
            <template preserve-content>
              <!--
              module to apply relevant styling for our application and vivid web components
              preloading the scheme is important as it is a critical styling resource
              -->

              <link rel="modulepreload" href="../node_modules/@vonage/vvd-scheme/vvd-scheme.js" />
              <script type="module" async>
                import { init } from '../node_modules/@vonage/vvd-scheme/vvd-scheme.js';

                (async () => {
                  await init();
                  document.body.classList.add('scheme-loaded');
                })();
              </script>
            </template>
          </code-sample>
        </dd>
        <dt>Add scheme selector (works in conjunction with vvd-scheme)</dt>
        <dd>
          <vwc-scheme-select @vvdschemeselect="${this.handleSelect}"></vwc-scheme-select>
          <code-sample copy-clipboard-button>
            <template preserve-content>
              (async () => { await customElements.whenDefined('vwc-scheme-select'); const
              schemeSelect = document.querySelector('vwc-scheme-select');
              schemeSelect.addEventListener('vvdschemeselect', ({ detail: { scheme } }) =>
              console.log(\`vwc-scheme-select output is: \${scheme}\`) ) })();
            </template>
          </code-sample>
        </dd>
      </dl>
    `;
  }

  handleSelect({ detail: { scheme } }) {
    console.log(`vwc-scheme-select output is: ${scheme}`);
  }

  // installed() {
  //   console.log(code)(
  //     // Developers should ensure that the component is
  //     // defined by using the whenDefined method of the
  //     // custom element registry before attempting to call
  //     // public methods.

  //     async () => {
  //       await customElements.whenDefined('vwc-scheme-select');
  //       const schemeSelect = document.querySelector('vwc-scheme-select');
  //       schemeSelect.addEventListener('vvdschemeselect', ({ detail: { scheme } }) =>
  //         console.log(`vwc-scheme-select output is: ${scheme}`),
  //       );
  //     },
  //   )();
  // }
}
