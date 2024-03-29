export const topLevelSelectors = {
	'vwc-button': '.mdc-button',
	'vwc-icon-button': '.mdc-icon-button',
	'vwc-icon-button-toggle': '.mdc-icon-button',
	'vwc-select': '.mdc-select',
	'vwc-textfield': '.mdc-text-field',
};

export function borderRadiusStyles(expectedRadius) {
	return {
		borderTopLeftRadius: expectedRadius,
		borderTopRightRadius: expectedRadius,
		borderBottomLeftRadius: expectedRadius,
		borderBottomRightRadius: expectedRadius,
	};
}

export function shapeStyles(shape, element) {
	const shapeRadius = {
		rounded: element === 'badge' ? '4px' : '6px',
		pill: element === 'badge' ? '14px' : '24px',
		circled: '50%',
	};

	return borderRadiusStyles(shapeRadius[shape]);
}

export function sizeStyles(size) {
	const sizes = {
		dense: 32,
		enlarged: 48,
		default: 40,
	};

	return { height: `${sizes[size]}px` };
}

export function layoutStyles(layout) {
	const layouts = {
		filled: {
			backgroundColor: 'rgb(0, 0, 0)',
			borderTopWidth: '0px',
			borderRightWidth: '0px',
			borderBottomWidth: '0px',
			borderLeftWidth: '0px',
			color: 'rgb(255, 255, 255)',
		},
		outlined: {
			backgroundColor: 'rgba(0, 0, 0, 0)',
			borderTopWidth: '1px',
			borderRightWidth: '1px',
			borderBottomWidth: '1px',
			borderLeftWidth: '1px',
			borderTopStyle: 'solid',
			borderRightStyle: 'solid',
			borderBottomStyle: 'solid',
			borderLeftStyle: 'solid',
			borderTopColor: 'rgb(0, 0, 0)',
			borderRightColor: 'rgb(0, 0, 0)',
			borderBottomColor: 'rgb(0, 0, 0)',
			borderLeftColor: 'rgb(0, 0, 0)',
			color: 'rgb(0, 0, 0)',
		},
		ghost: {
			backgroundColor: 'rgba(0, 0, 0, 0)',
			borderTopWidth: '0px',
			borderRightWidth: '0px',
			borderBottomWidth: '0px',
			borderLeftWidth: '0px',
			color: 'rgb(0, 0, 0)',
		},
	};

	return layouts[layout];
}

export const PRINCIPAL_SCHEME_VARIABLES_FILTER = /-(on-|)(base|surface|primary)$/;

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
			.map(entry => entry.trim().split(/\s*:\s*/))
			.reduce((r, [key, value]) => {
				r[key] = value;
				return r;
			}, {});
	});
	return result;
}

/**
 * collects a set of variables from the said scheme (main flavor)
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

	const mainSchemeSet = getSchemeVariables()[`${scheme}/main`];
	return filter
		? Object.keys(mainSchemeSet).filter(key => filter.test(key))
		: Object.keys(mainSchemeSet);
}

/**
 * collects a set of variables from the said scheme (main flavor) and
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

	const mainSchemeSet = getSchemeVariables()[`${scheme}/main`];
	if (!mainSchemeSet) {
		throw new Error(`extected to get asserted scheme set, got ${mainSchemeSet}`);
	}

	const keys = variablesFilter
		? Object.keys(mainSchemeSet).filter(k => variablesFilter.test(k))
		: Object.keys(mainSchemeSet);
	if (!keys || !keys.length) {
		throw new Error(`expected asserted variables list to NOT be empty, got ${keys}`);
	}

	const ee = element || document.body;
	keys.forEach((key) => {
		const varVal = getComputedStyle(ee).getPropertyValue(key).trim();
		if (varVal !== mainSchemeSet[key]) {
			throw new Error(
				`scheme CSS variable mismatch: '${key}' expected to be '${mainSchemeSet[key]}', living DOM value found is '${varVal}'`
			);
		}
	});
}
