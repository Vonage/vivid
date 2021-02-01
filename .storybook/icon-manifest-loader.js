const got = require('got');

module.exports = async function(source){
	const VERSION = JSON.parse(source) || "1.0.0";
	return got({ url: `https://icons.resources.vonage.com/3f7739a0-a898-4f69-a82b-ad9d743170b6/v${VERSION}/manifest.json`, responseType: 'text', resolveBodyOnly: true })
		.catch(()=> JSON.stringify([]));
};