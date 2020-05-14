import { html } from 'lit-html';
import Element from '../modules/Element.js';
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
        <dt>Add scheme selector</dt>
        <dd>
          <vwc-scheme-select></vwc-scheme-select>
          <code-sample copy-clipboard-button>
            <template preserve-content>

            </template>
          </code-sample>
          <iframe
            src="https://carbon.now.sh/embed?bg=rgba(171%2C%20184%2C%20195%2C%201)&t=dracula&wt=none&l=javascript&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=16.5px&lh=133%25&si=false&es=2x&wm=false&code=(async%2520()%2520%253D%253E%2520%257B%250A%2520%2520await%2520customElements.whenDefined('vwc-scheme-select')%253B%250A%2520%2520const%2520todoListElement%2520%253D%2520document.querySelector('vwc-scheme-select')%253B%250A%2520%2520todoListElement.addEventListener('vvd-scheme-select'%252C%2520(%257B%2520detail%253A%2520%257B%2520scheme%2520%257D%2520%257D)%2520%253D%253E%250A%2520%2520%2520%2520console.log(%2560vwc-scheme-select%2520output%2520is%253A%2520%2524%257Bscheme%257D%2560)%252C%250A%2520%2520)%253B%250A%257D)()%253B"
            style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
            sandbox="allow-scripts allow-same-origin"
          >
          </iframe>
        </dd>
      </dl>
    `;
  }

  installed() {
    console.log(code)(
      // Developers should ensure that the component is
      // defined by using the whenDefined method of the
      // custom element registry before attempting to call
      // public methods.

      async () => {
        await customElements.whenDefined('vwc-scheme-select');
        const todoListElement = document.querySelector('vwc-scheme-select');
        todoListElement.addEventListener('vvd-scheme-select', ({ detail: { scheme } }) =>
          console.log(`vwc-scheme-select output is: ${scheme}`),
        );
      },
    )();
  }
}
