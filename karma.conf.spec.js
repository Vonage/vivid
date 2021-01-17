const fetchOriginalConfig = require('./karma.conf');

module.exports = config => {
	const originalConfig = fetchOriginalConfig(config);
	return {
		...originalConfig,
		browsers: [process.env.RUN === 'CI' ? 'ChromeHeadless' : 'Chrome'],
		autoWatch: true,
		singleRun: false
	}
};
