const fetchOriginalConfig = require('./karma.conf');

const browsers = [process.env.RUN === 'CI' ? 'ChromeHeadless' : 'Chrome'];
module.exports = config => {
	const originalConfig = fetchOriginalConfig(config);
	originalConfig.browsers = browsers;
	originalConfig.autoWatch = true;
	originalConfig.singleRun = false;
	return originalConfig;
};
