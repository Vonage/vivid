const
	_ = require('lodash'),
	fp = require('lodash/fp'),
	kefir = require('kefir'),
	https = require('https');

const
	BANNER_URL = "http://d3fzvwfxu7izti.cloudfront.net/banner-2.png",
	HOMEPAGE_URL = "https://github.com/Vonage/vivid",
	COMMIT_BASE_URL = [HOMEPAGE_URL, "commit"].join('/'),
	PREVIEW_ITEM_COUNT = 5;

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

exports.releaseTemplate = ({ version, log_lines: rawLogLines })=>{

	const formatLogLine = (icon = "•")=> ({ comment, sha })=> [
		"",
		icon,
		_.truncate(sanitizeSlackText(_.capitalize(comment.replace(/^[\s\S]+:\s*/, ''))), { length: 60 }),
		`(<${[COMMIT_BASE_URL, sha].join('/')}|${sha.substr(0, 7)}>)`
	].join(' ');

	const
		validLog = rawLogLines.filter(({ comment })=> !/(branch)|(pull request)/i.test(comment)),
		bugs = validLog.filter(({ comment })=> /^fix(e[ds])?.*?:/i.test(comment)).map(formatLogLine(':beetle:')),
		features = validLog.filter(({ comment })=> /^feat(ures?)?.*?:/i.test(comment)).map(formatLogLine(':star:'));

	return {
		"blocks": [
			{
					"type": "header",
					"text": {
							"type": "plain_text",
							"text": `New Vivid release (v${version}) is now available! :${_.sample(["clap", "raised_hands", "smile"])}:`
					}
			},
			{
				"type": "image",
				"image_url": BANNER_URL,
				"alt_text": "New Vivid Release!"
			},
			..._({ "Features": features, "Bug Fixes": bugs })
				.map((list, title)=>
					list.length && {
						"type": "section",
						"text": {
							"type": "mrkdwn",
							"text": [`*${title}*\n`, ...list.slice(0, PREVIEW_ITEM_COUNT), list.length > PREVIEW_ITEM_COUNT && `..and <${HOMEPAGE_URL}|${list.length - PREVIEW_ITEM_COUNT} more>`].filter(Boolean).join('\n')
						}
					}
				)
				.compact()
				.value()
		]
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