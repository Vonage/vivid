const conventionalChangelogCore = require('conventional-changelog-core');
const angularPreset = require('conventional-changelog-angular');

const parserOpts = {
	finalizeContext: function(context, options, commits, keyCommit) {
		console.log(context, commits, keyCommit);
	}
}
angularPreset.then(config => {

	const cl = conventionalChangelogCore(config, {}, {}, {}, parserOpts);
	cl.pipe(process.stdout); // or any writable stream
});

