const
    fs = require('fs'),
    fp = require('lodash/fp'),
    path = require('path'),
    split = require('split'),
    kefir = require('kefir'),
    minimist = require('minimist'),
    { pipeline } = require('stream'),
    gitLogAnalyzerFactory = require('./git_log_analyzer'),
    { factory: slackDispatcherFactory, releaseTemplate: slackReleaseTemplate } = require('./slack_dispatcher');

const { file:fileName = "--", slackHookUrl } = minimist(process.argv.slice(2));

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
    .take(1)
    .flatMap(({ version, lines: log_lines })=>
        kefir
            .fromPromise(slackDispatcher(slackReleaseTemplate({ version, log_lines })))
            .map(()=> `Message successfully sent to Slack`)
    )
    .onValue(console.log)
    .onError(console.warn);