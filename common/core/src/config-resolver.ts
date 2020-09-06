//	TODO: this service is currently internal and known to resolve a genereal config preset from the attribute "vivid-context" on html element
//	TOOD: we need to consider to provide a reconfigure API (probably in the vvd-core module) which will override this autodetection facility
const defaultConfig = {
	scheme: 'light'
} as Record<string, unknown>;
let effectiveConfig: Record<string, unknown> | null = null;

effectiveConfig = updateByHtmlAttribute();

if (!effectiveConfig) {
	effectiveConfig = defaultConfig;
}

export default effectiveConfig;

function updateByHtmlAttribute(): Record<string, unknown> | null {
	let result = null;
	const htmlContextAttribute = document.documentElement.getAttribute('vivid-context');
	if (htmlContextAttribute) {
		result = {};
	}
	return result;
}
