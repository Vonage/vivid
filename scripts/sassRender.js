const sass = require('sass');
const Fiber = require('fibers');
const fs = require('fs');

sass.render(
  {
    file: './packages/button/src/vwc-button.scss',
    // importer: function(url, prev, done) {
    //   console.log('sass importer');
    // },
    outputStyle: 'compressed',
    fiber: Fiber,
  },
  (err, result) => {
    if (result) {
      const css = result.css.toString();
      const template = `
      import { css } from 'lit-element';

      export const style = css\`${css}\`
      `;
      fs.writeFileSync('./packages/button/src/vwc-button.css.ts', template);
    }
  },
);
