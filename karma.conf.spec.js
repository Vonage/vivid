const fetchOriginalConfig = require('./karma.conf');

const browsers = [process.env.RUN === 'CI' ? 'ChromeHeadless' : 'Chrome'];
const excludedFiles = files => files.filter(x => x.included === false ? x : null).filter(x => x)
const includePattern = pattern => ({ pattern, type: 'module' })
module.exports = config => {
	const originalConfig = fetchOriginalConfig(config);
	originalConfig.files = process.env.KARMA_PATTERN ? [
		includePattern(process.env.KARMA_PATTERN),
		...excludedFiles(originalConfig.files)
	] : originalConfig.files;
	originalConfig.browsers = browsers;
	originalConfig.autoWatch = true;
	originalConfig.singleRun = false;
	return originalConfig;
};
