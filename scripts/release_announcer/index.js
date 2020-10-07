const
    fs = require('fs'),
    fp = require('lodash/fp'),
    split = require('split'),
    kefir = require('kefir'),
		semverDiff = require('semver-diff'),
    minimist = require('minimist'),
    { pipeline } = require('stream'),
    gitLogAnalyzerFactory = require('./git_log_analyzer'),
    { factory: slackDispatcherFactory, releaseTemplate: slackReleaseTemplate } = require('./slack_dispatcher');

const { file:fileName = "--", slackHookUrl } = minimist(process.argv.slice(2));

const ANNOUNCE_TYPE = ["major", "minor"];

const
	slackDispatcher = slackDispatcherFactory({ hook_url: slackHookUrl }),
	createLineStream = function(rawStream){
		return kefir.stream(({ emit, error, end })=> {
			let stream = pipeline(rawStream, split(), (err)=> end(err && error(err)));
			stream.on('data', emit);
			return ()=> stream.off('data', emit);
		});
	};

createLineStream(fileName === "--" ? process.stdin : fs.createReadStream(fileName))
	.thru(gitLogAnalyzerFactory())
	.filter(fp.pipe(fp.get('version'), fp.negate(fp.isUndefined)))
	.slidingWindow(2,2)
	.take(1)
	.flatMap(([newRelease, previousRelease])=>
		kefir[
			ANNOUNCE_TYPE.includes(semverDiff(...[previousRelease, newRelease].map(fp.get('version'))))
				? "constant"
				: "never"
			](newRelease)
	)
	.flatMap(({ version, log_lines })=>
		kefir
			.fromPromise(slackDispatcher(slackReleaseTemplate({ version, log_lines })))
			.map(() => `Message successfully sent to Slack`)
	)
	.onValue(console.log)
	.onError(()=> {
		console.log('Failed to send message to Slack');
		process.exit(1);
	});