const fs = require('fs-extra');

const baseDir = 'common/fonts/src/';
const templateFiles = fs.readdirSync(baseDir).filter(fn => fn.match(/^.*-template.scss$/));
// console.info(`embed-fonts: found templates ${templateFiles}`);

templateFiles.forEach(tfn => {
  // console.info(`embed-fonts: processing ${tfn}`);
  const template = fs.readFileSync(baseDir + tfn, 'utf8');
  if (template) {
  }
  //	lookup for URL
  //	read font by URL
  //	transform to base64
  //	embed into template
  //	save the template
});
