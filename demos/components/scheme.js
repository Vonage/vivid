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
          <iframe
            src="https://carbon.now.sh/embed?bg=rgba(171%2C%20184%2C%20195%2C%201)&t=dracula&wt=none&l=javascript&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=16.5px&lh=133%25&si=false&es=2x&wm=false&code=%253C!--%2520%250Amodule%2520to%2520apply%2520relevant%2520styling%2520for%2520our%2520application%2520and%2520vivid%2520web%2520components%250Apreloading%2520the%2520scheme%2520is%2520important%2520as%2520it%2520is%2520a%2520critical%2520styling%2520resource%2520%250A--%253E%250A%250A%253Clink%2520rel%253D%2522modulepreload%2522%2520href%253D%2522..%252Fnode_modules%252F%2540vonage%252Fvvd-scheme%252Fvvd-scheme.js%2522%2520%252F%253E%250A%253Cscript%2520type%253D%2522module%2522%2520async%253E%250Aimport%2520%257B%2520init%2520%257D%2520from%2520'..%252Fnode_modules%252F%2540vonage%252Fvvd-scheme%252Fvvd-scheme.js'%253B%250A%250A(async%2520()%2520%253D%253E%2520%257B%250Aawait%2520init()%253B%250Adocument.body.classList.add('scheme-loaded')%253B%250A%257D)()%253B%250A%253C%252Fscript%253E"
            style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
            sandbox="allow-scripts allow-same-origin"
          >
          </iframe>
        </dd>
        <dt>Add scheme selector</dt>
        <dd>
          <vwc-scheme-select></vwc-scheme-select>
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
    // Developers should ensure that the component is
    // defined by using the whenDefined method of the
    // custom element registry before attempting to call
    // public methods.

    (async () => {
      await customElements.whenDefined('vwc-scheme-select');
      const todoListElement = document.querySelector('vwc-scheme-select');
      todoListElement.addEventListener('vvd-scheme-select', ({ detail: { scheme } }) =>
        console.log(`vwc-scheme-select output is: ${scheme}`),
      );
    })();
  }
}
