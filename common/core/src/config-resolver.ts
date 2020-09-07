const
	VVD_CONTEXT_ATTRIBUTE = 'data-vvd-context',
	defaultConfig = {} as Record<string, unknown>;

let tmpConfig: Record<string, unknown> | null = null;

tmpConfig = updateByHtmlAttribute();

if (!tmpConfig) {
	tmpConfig = defaultConfig;
}

const effectiveConfig: Record<string, unknown> = tmpConfig;
export default effectiveConfig;

function updateByHtmlAttribute(): Record<string, unknown> | null {
	let result = null;
	const htmlContextAttribute = document.documentElement.getAttribute(VVD_CONTEXT_ATTRIBUTE);
	if (htmlContextAttribute) {
		result = {};
	}
	return result;
}
