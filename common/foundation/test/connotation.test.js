import {
	waitNextTask,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { getSchemeVariables } from '../../../test/style-utils.js';

export { assertConnotationAttribute, assertConnotationProperty };

async function assertConnotationAttribute({
	element,
	connotation,
	childrenAffected,
	stylesAffected,
}) {
	validateParams(element, connotation, childrenAffected, stylesAffected);

	element.setAttribute('connotation', connotation);
	await waitNextTask();
	assertSelfOrChildrenAffected(
		connotation,
		element,
		childrenAffected,
		stylesAffected
	);
}

async function assertConnotationProperty({
	element,
	connotation,
	childrenAffected,
	stylesAffected,
}) {
	validateParams(element, connotation, childrenAffected, stylesAffected);

	element.connotation = connotation;
	await waitNextTask();
	assertSelfOrChildrenAffected(
		connotation,
		element,
		childrenAffected,
		stylesAffected
	);
}

function validateParams(
	element,
	connotation,
	childrenAffected,
	stylesAffected
) {
	if (!element || !element.nodeTyp === Node.ELEMENT_NODE) {
		throw new Error(`element node expected, got ${element}`);
	}
	if (!connotation || typeof connotation !== 'string') {
		throw new Error(`connotation MUST be a non-empty string, got ${connotation}`);
	}
	if (
		childrenAffected &&
		(!Array.isArray(childrenAffected) || !childrenAffected.length)
	) {
		throw new Error(
			`children affected, when/if specified, MUST be an array having at least 1 value, got ${childrenAffected}`
		);
	}
	if (!Array.isArray(stylesAffected) || !stylesAffected.length) {
		throw new Error(
			`styles affected array expected to have at least 1 value, got ${stylesAffected}`
		);
	}
}

function assertSelfOrChildrenAffected(
	connotation,
	element,
	childrenSelectors,
	stylesAffected
) {
	const schemeVars = getSchemeVariables();
	const expectedColor = schemeVars['light/main'][`--vvd-color-${connotation}`];
	if (!expectedColor) {
		throw new Error(
			`failed to find '--vvd-color-${connotation}' value in 'light/main' scheme`
		);
	}

	const expectedStyles = stylesAffected.reduce((acc, v) => {
		acc[v] = expectedColor;
		return acc;
	}, {});
	if (childrenSelectors) {
		for (const s of childrenSelectors) {
			if (s.startsWith(':')) {
				assertComputedStyle(element, expectedStyles, s);
			} else {
				const ae = (element.shadowRoot || element).querySelector(s);
				if (!ae) {
					throw new Error(
						`failed to query an affected element from ${element} by selector '${s}'`
					);
				}
				assertComputedStyle(ae, expectedStyles);
			}
		}
	} else {
		assertComputedStyle(element, expectedStyles);
	}
}
