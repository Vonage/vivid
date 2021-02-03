const got = require('got');

module.exports = async function(source){
	const VERSION = JSON.parse(source) || "1.0.0";
	return got({ url: `https://icon.resources.vonage.com/v${VERSION}/manifest.json`, responseType: 'text', resolveBodyOnly: true })
		.catch(()=> JSON.stringify([]));
};