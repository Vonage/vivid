import Router from 'navigo';
import { html, render } from 'lit-html';

import * as components from './components/index.js';

const router = new Router();

for (const key in components) {
  components[key].prototype.router = router;
  customElements.define(`${key}-route`, components[key]);
}

// router.on('/post/:id', params => {
//   const element = HTML`<post-element></post-element>`;
//   element.post = params.id;
//   document.querySelector('#root').replaceWith(element);
// });
const root = document.querySelector('#root');
router
  .on({
    '/': function () {
      render(
        html`
          <home-route></home-route>
        `,
        root,
      );
    },
    'home': function () {
      render(
        html`
          <home-route></home-route>
        `,
        root,
      );
    },
    'scheme': function () {
      render(
        html`
          <scheme-route></scheme-route>
        `,
        root,
      );
    },
    'button': function () {
      render(
        html`
          <button-route></button-route>
        `,
        root,
      );
    },
    'checkbox': function () {
      render(
        html`
          <checkbox-route></checkbox-route>
        `,
        root,
      );
    },
    'formfield': function () {
      render(
        html`
          <formfield-route></formfield-route>
        `,
        root,
      );
    },
    'textarea': function () {
      render(
        html`
          <textarea-route></textarea-route>
        `,
        root,
      );
    },
    'textfield': function () {
      render(
        html`
          <textfield-route></textfield-route>
        `,
        root,
      );
    },
    'vwcapp': function () {
      render(
        html`
          <vwcapp-route></vwcapp-route>
        `,
        root,
      );
    },
    'list': function () {
      render(
        html`
          <list-route></list-route>
        `,
        root,
      );
    },
    'select': function () {
      render(
        html`
          <select-route></select-route>
        `,
        root,
      );
    },
    'drawer': function () {
      render(
        html`
          <drawer-route></drawer-route>
        `,
        root,
      );
    },
    'checkbox': function() {
      render(
        html`
          <checkbox-route></checkbox-route>
        `,
        root,
      );
    },
  })
  .resolve();
