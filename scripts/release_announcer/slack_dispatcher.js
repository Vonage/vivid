const
    _ = require('lodash'),
    request = require('request'),
    { promisify } = require('util');

const sanitizeSlackText = (function(filters){
    return (text)=> filters.reduce((res, filter)=> filter(res), text);
})([
    (text)=> text.replace(/&/g, '&amp;'),
    (text)=> text.replace(/</g, '&lt;'),
    (text)=> text.replace(/>/g, '&gt;')
]);

const countLines = (function(testers){
    return (logLines, type = "fix")=> {
        return logLines.reduce((ac, line)=> ac += testers[type](line) ? 1 : 0, 0)
    };
})({
    "fix": (line)=> /\bfix\b/i.test(line),
    "feature": (line)=> /\b(feature|issue)\b/i.test(line),
    "commit": ()=> true
});

exports.releaseTemplate = ({ version, log_lines })=>{
    let count = _.partial(countLines, log_lines);
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
                "type": "divider"
            },
            {
                "type": "image",
                "image_url": _.sample([
                    "https://media.tenor.com/images/e9b40734a93ecbdcebdff345e670276f/tenor.gif",
                    "https://media.tenor.com/images/0e74a3c2b4eee7df85226c1a265fb613/tenor.gif",
                    "https://media.tenor.com/images/f7db99400c0c5d0ad921f2512cc4f022/tenor.gif",
                    "https://media.tenor.com/images/886da5bd0b98017f8e7f8fc85a64a50f/tenor.gif",
                ]),
                "alt_text": "New Vivid Release"
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `We are ${_.sample(["proud", "excited", "thrilled"])} to announce the newest *Vivid* release!\nTo upgrade your development environment, run: \`\`\`yarn upgrade --pattern="@vonage/*"\`\`\``
                },
                "fields": [
                    ..._(["commit", "fix", "feature"]).map((name)=>{
                        const cnt = count(name);
                        return cnt && { type: "mrkdwn", text: `*${({ "fix": "Bug Fixes", "feature": "New Features", "commit": "Commits" })[name]}*\n${cnt.toLocaleString()}` }
                    }).compact().value()
                ]
            }
        ]
    };
};

exports.factory = function({ hook_url }){
    const req = promisify(request);
    return function(message){
        return req({ url: hook_url, method: "POST", json: message });
    };
};