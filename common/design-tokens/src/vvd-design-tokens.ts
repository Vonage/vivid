const theo = require('theo');

theo
  .convert({
    transform: {
      type: 'web',
      file: 'buttons.yml',
    },
    format: {
      type: 'scss',
    },
  })
  .then(scss => {
	// $button-background: rgb(0, 112, 210);
	console.log(scss);
  })
  .catch(error => console.log(`Something went wrong: ${error}`));
