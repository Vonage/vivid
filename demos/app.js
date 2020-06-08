import Router from 'navigo';
import { html, render } from 'lit-html';

import * as components from './components/index.js';

const router = new Router();

Object.keys(components).forEach(key => {
  components[key].prototype.router = router;
  customElements.define(`${key}-route`, components[key]);
});

// router.on('/post/:id', params => {
//   const element = HTML`<post-element></post-element>`;
//   element.post = params.id;
//   document.querySelector('#root').replaceWith(element);
// });
const componentDemoContainer = document.querySelector('.comp-demo');
router
  .on({
    '/': function () {
      render(html` <home-route></home-route> `, componentDemoContainer);
    },
    button: function () {
      render(html` <button-route></button-route> `, componentDemoContainer);
    },
    checkbox: function () {
      render(html` <checkbox-route></checkbox-route> `, componentDemoContainer);
    },
    chip: function () {
      render(html` <chip-route></chip-route> `, componentDemoContainer);
    },
    drawer: function () {
      render(html` <drawer-route></drawer-route> `, componentDemoContainer);
    },
    fonts: function () {
      render(html` <fonts-route></fonts-route> `, componentDemoContainer);
    },
    formfield: function () {
      render(html` <formfield-route></formfield-route> `, componentDemoContainer);
    },
    home: function () {
      render(html` <home-route></home-route> `, componentDemoContainer);
    },
    list: function () {
      render(html` <list-route></list-route> `, componentDemoContainer);
    },
    scheme: function () {
      render(html` <scheme-route></scheme-route> `, componentDemoContainer);
    },
    select: function () {
      render(html` <select-route></select-route> `, componentDemoContainer);
    },
    slider: function () {
      render(html` <slider-route></slider-route> `, componentDemoContainer);
    },
    textarea: function () {
      render(html` <textarea-route></textarea-route> `, componentDemoContainer);
    },
    textfield: function () {
      render(html` <textfield-route></textfield-route> `, componentDemoContainer);
    },
    vwcapp: function () {
      render(html` <vwcapp-route></vwcapp-route> `, componentDemoContainer);
    },
  })
  .resolve();
