import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-scheme-select';

export default class Scheme extends Element {
  async getHtml() {
    return html`
      <dl>
        <dt>
          Scheme
        </dt>
        <dd>
          <figure>
            <figcaption>head</figcaption>
            <code-sample copy-clipboard-button>
              <template preserve-content>
                <!-- module to apply relevant styling for our application and vivid web components
preloading the scheme is important as it is a critical styling resource -->

                <link rel="modulepreload" href="../node_modules/@vonage/vvd-scheme/vvd-scheme.js" />
                <script type="module" async>
                  import { init } from '../node_modules/@vonage/vvd-scheme/vvd-scheme.js';

                  (async () => {
                    await init();
                    document.body.classList.add('scheme-loaded');
                  })();
                </script>

                <!-- Waiting for scheme to load as it's part of a critical style -->
                <style rel="stylesheet">
                  body:not(.scheme-loaded) {
                    display: none;
                  }
                </style>
              </template>
            </code-sample>
          </figure>
        </dd>
        <dt>Add scheme selector (works in conjunction with vvd-scheme)</dt>
        <dd>
          <vwc-scheme-select @vvdschemeselect="${this.handleSelect}"></vwc-scheme-select>

          <figure>
            <figcaption>load</figcaption>
            <code-sample copy-clipboard-button>
              <template preserve-content>
                import '@vonage/vwc-scheme-select'; import '@vonage/vwc-button';
              </template>
            </code-sample>
          </figure>

          <figure>
            <figcaption>html</figcaption>
            <code-sample copy-clipboard-button>
              <template preserve-content>
                <vwc-scheme-select @vvdschemeselect="${this.handleSelect}"></vwc-scheme-select>
              </template>
            </code-sample>
          </figure>

          <figure>
            <figcaption>extra</figcaption>
            <code-sample copy-clipboard-button>
              <template preserve-content>
                (async () => { await customElements.whenDefined('vwc-scheme-select'); const
                schemeSelect = document.querySelector('vwc-scheme-select');
                schemeSelect.addEventListener('vvdschemeselect', ({ detail: { scheme } }) =>
                console.log(\`vwc-scheme-select output is: \${scheme}\`) ) })();
              </template>
            </code-sample>
          </figure>
        </dd>
      </dl>
    `;
  }

  handleSelect({ detail: { scheme } }) {
    console.log(`vwc-scheme-select output is: ${scheme}`);
  }
}
