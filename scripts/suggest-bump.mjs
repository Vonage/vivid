import standardVersion from 'standard-version';

const log = [];
const originalConsoleInfo = console.info;
console.info = message => log.push(message);

standardVersion({
	bumpFiles: [{ filename: 'lerna.json', type: 'json' }],
	packageFiles: [{ filename: 'lerna.json', type: 'json' }],
	dryRun: true,
	skip: {
		changelog: true,
		commit: true,
		tag: true
	}
}).then(() => {
	console.info = originalConsoleInfo;

	const proposalLogLine = log.find(logLine => logLine.includes('bumping version in lerna.json'));
	const proposedVersion = proposalLogLine.match(/.*(to.+m)(?<candidate>[0-9.]+)(.+m)$/).groups.candidate;

	console.info(proposedVersion);
});