const
	_ = require('lodash'),
	fp = require('lodash/fp'),
	kefir = require('kefir'),
	https = require('https');

const
	HOMEPAGE_URL = "https://github.com/Vonage/vivid",
	COMMIT_BASE_URL = [HOMEPAGE_URL, "commit"].join('/'),
	PREVIEW_ITEM_COUNT = 20;

const nodeStreamToKefir = (stream)=> {
	return kefir
		.stream(async({ emit, error, end })=> {
			try { for await(let chunk of stream){ emit(Buffer.from(chunk)); } }
			catch(e) { error(e); }
			end();
		})
		.takeErrors(1);
};

const mimeTransformer = (function(){
	const MIME = {
		"text/html": fp.pipe(fp.toString),
		"application/json": fp.pipe(fp.toString, JSON.parse)
	};
	return (mimeType)=> (MIME[mimeType] || fp.toString);
})();

const sanitizeSlackText = (function(filters){
    return (text)=> filters.reduce((res, filter)=> filter(res), text);
})([
    (text)=> text.replace(/&/g, '&amp;'),
    (text)=> text.replace(/</g, '&lt;'),
    (text)=> text.replace(/>/g, '&gt;')
]);

const extractCC = (commitMessage)=> (commitMessage.match(/(?<type>\w+)\s*(\((?<scope>.+?)\))?\s*:\s*(?<body>.+)/) || []).groups || {};

const formatLogLine = ({ comment, sha }) => {
	const { scope, body } = extractCC(comment);
	return [].concat(
		!fp.overSome([fp.isUndefined, fp.includes(["workspace"])])(scope)
			? [
				":vivid: ",
				`*${_.truncate(sanitizeSlackText(_.lowerCase(scope)), { length: 20 })}*: `,
				_.truncate(sanitizeSlackText(_.capitalize(body)), { length: 80 }),
				` [<${[COMMIT_BASE_URL, sha].join('/')}|${sha.substr(0, 7)}>]`
			].join('')
			: []
	);
};

exports.releaseTemplate = ({ version, log_lines: rawLogLines }) => {

	const lines = _(rawLogLines)
		.filter(({ comment })=> !/(branch)|(pull request)/i.test(comment))
		.sortBy(fp.pipe(fp.get('comment'), extractCC, fp.get('scope')))
		.flatMap(formatLogLine)
		.value();

	return {
		"blocks": [
			{
				"type": "header",
				"text": {
					"type": "plain_text",
					"text": `New Vivid release (v${version}) is now available! :${_.sample(["clap", "raised_hands", "smile"])}:`
				}
			},
			lines.length && {
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": [
						...lines.slice(0, PREVIEW_ITEM_COUNT),
						lines.length > PREVIEW_ITEM_COUNT && `..and <${HOMEPAGE_URL}|${lines.length - PREVIEW_ITEM_COUNT} more>`
					].filter(Boolean).join('\n')
				}
			}
		].filter(Boolean)
	};
};

exports.factory = function({ hook_url }){
		return (message)=> kefir
			.fromCallback((cb)=> {
				const req = https.request(hook_url, {
					method: "POST",
					headers: { "Content-Type": "application/json" }
				}, cb);
				req.end(JSON.stringify(message));
			})
			.flatMap((res)=>
				nodeStreamToKefir(res.setEncoding(null))
					.scan(_.concat, [])
					.last()
					.map(fp.pipe(Buffer.concat, mimeTransformer(res.headers["content-type"])))
					.flatMap((payload)=> kefir[~~(res.statusCode/100) === 2 ? "constant" : "constantError"](payload))
			)
			.toPromise();
};
