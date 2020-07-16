const conventionalChangelogCore = require('conventional-changelog-core');
const angularPreset = require('conventional-changelog-angular');

angularPreset.then(config => {
	config.conventionalChangelog.finalizeContext = function(context, options, commits, keyCommit) {
		console.log(context);
	}
	conventionalChangelogCore(config)
		.pipe(function(data) {
			console.log(data);
		}); // or any writable stream
});

