const watch = require('node-watch');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const watchOptions = {
  recursive: true,
  filter: f => !/node_modules/.test(f) && /src/.test(f) && /.(?:ts|scss)$/.test(f),

  //   path => {
  //   if (
  //     path.contains('node_modules') ||
  //     !path.contains('src')
  //     ) { return false; }
  //     if (path.indexOf('node_modules') > -1) {
  //       return false;
  //     }
  //   if (path.indexOf('src') === -1) {
  //     return false;
  //   }
  //   return /.(?:ts|scss)$/.test(path);
  // },
};

watch('packages', watchOptions, onChange);

let inProgress = false;

async function onChange(evt, name) {
  if (inProgress) {
    return;
  }
  inProgress = true;

  console.log('%s changed.', name);

  // only typescript or style & typescript
  const jobPromise = name.endsWith('ts') ? exec('npm run build:typescript') : exec('npm run build');

  try {
    await jobPromise;
  } catch (err) {
    console.log(err);
  }

  console.log('done');
  inProgress = false;
}
