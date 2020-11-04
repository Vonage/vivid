export function borderRadiusStyles(expectedRadius) {
	return {
		borderTopLeftRadius: `${expectedRadius}px`,
		borderTopRightRadius: `${expectedRadius}px`,
		borderBottomLeftRadius: `${expectedRadius}px`,
		borderBottomRightRadius: `${expectedRadius}px`,
	};
}

export const body1TypographyStyles = {
	fontFamily: 'SpeziaWebVariable',
	fontSize: '16px',
	fontWeight: '400',
	fontStretch: '50%',
	lineHeight: '25.7324px',
	// letterSpacing: '0.15px',
	textTransform: 'none',
}

export const body2TypographyStyles = {
	fontFamily: 'SpeziaWebVariable',
	fontSize: '14.2222px',
	fontWeight: '400',
	fontStretch: '50%',
	// lineHeight: 'normal',
	// letterSpacing: '0.133333px',
	textTransform: 'none',
}

export const captionTypographyStyles = {
	fontFamily: 'SpeziaWebVariable',
	fontSize: '12.642px',
	fontWeight: '400',
	fontStretch: '50%',
	lineHeight: '20.3286px',
	// letterSpacing: '0.119',
	textTransform: 'none',
}

export const PRINCIPAL_VARIABLES_FILTER = /(base|surface|primary)-(background|foreground)/;

export function getSchemeFiles() {
	const DT_SCHEMES_BASE_PATH = 'common/design-tokens/build/scss/schemes/';
	return Object.entries(window.__FIXTURES__).reduce((result, [key, value]) => {
		if (key.startsWith(DT_SCHEMES_BASE_PATH)) {
			result[key.replace(DT_SCHEMES_BASE_PATH, '')] = value;
		}
		return result;
	}, {});
}

export function getSchemeVariables() {
	const result = {};
	const schemeFiles = getSchemeFiles();
	Object.keys(schemeFiles).forEach((sf) => {
		const schemeKey = sf.replace(/\..+$/, '');
		result[schemeKey] = schemeFiles[sf]
			.replace(/^[^-]+/, '')
			.replace(/;[^;]+?$/, '')
			.split(';')
			.map((entry) => entry.trim().split(/\s*:\s*/))
			.reduce((r, [key, value]) => {
				r[key] = value;
				return r;
			}, {});
	});
	return result;
}

/**
 * collects a set of variables from the said scheme (base flavor)
 * filter them if any filter supplied
 *
 * @param {string} scheme - scheme name to pick variables from
 * @param {RegExp} variablesRegex - variables filter
 * @returns list of variable names
 */
export function getBaseVarNames(scheme, filter) {
	if (!scheme || typeof 'scheme' !== 'string') {
		throw new Error(`scheme MUST be a non-empty string, got ${scheme}`);
	}

	const baseSchemeSet = getSchemeVariables()[`${scheme}/base`];
	return filter
		? Object.keys(baseSchemeSet).filter(key => filter.test(key))
		: Object.keys(baseSchemeSet);
}

/**
 * collects a set of variables from the said scheme (base flavor) and
 * asserts they are set in the living element
 *
 * @param {string} scheme - scheme name to pick variables from
 * @param {RegExp} variablesFilter - variables filter
 * @param {HTMLElement | undefined} element - element to lookup for the 'living variables' in; defaults to document.body
 */
export function assertBaseVarsMatch(scheme, variablesFilter, element) {
	if (!scheme || typeof 'scheme' !== 'string') {
		throw new Error(`scheme MUST be a non-empty string, got ${scheme}`);
	}

	const baseSchemeSet = getSchemeVariables()[`${scheme}/base`];
	if (!baseSchemeSet) {
		throw new Error(`extected to get asserted scheme set, got ${baseSchemeSet}`);
	}

	const keys = variablesFilter
		? Object.keys(baseSchemeSet).filter(k => variablesFilter.test(k))
		: Object.keys(baseSchemeSet);
	if (!keys || !keys.length) {
		throw new Error(`expected asserted variables list to NOT be empty, got ${keys}`);
	}

	const ee = element || document.body;
	keys.forEach((key) => {
		const varVal = getComputedStyle(ee).getPropertyValue(key).trim();
		if (varVal !== baseSchemeSet[key]) {
			throw new Error(
				`scheme CSS variable mismatch: '${key}' expected to be '${baseSchemeSet[key]}', living DOM value found is '${varVal}'`
			);
		}
	});
}