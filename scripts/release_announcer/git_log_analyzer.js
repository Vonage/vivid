const
    _ = require('lodash'),
    fp = require('lodash/fp');

const DEFAULT_VERSION_EXTRACTOR = (meta = "")=> _.last(meta.match(/tag: v([0-9]+\.[0-9]+\.[0-9]+)/));

module.exports = ({ version_extractor: extractVersion = DEFAULT_VERSION_EXTRACTOR } = {})=> (lineLogStream)=> {
		return lineLogStream
        .map((line)=> (line.match(/^(?<sha>[0-9a-f]{40})(\s\((?<meta>.+?)\))*\s(?<comment>.+)$/) || { groups: {} })["groups"])
        .bufferWhile(({ meta })=> !extractVersion(meta))
        .diff((prev , cur)=>{
            return {
                version: prev.slice(-1).map(fp.flow(fp.get('meta'), extractVersion))[0],
                lines: [...prev.slice(-1), ...cur.slice(0, -1)].map(fp.get('comment'))
            };
        }, []);
};