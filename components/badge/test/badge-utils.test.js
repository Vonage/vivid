import { assertComputedStyle } from '../../../test/test-helpers.js';

function borderRadiusStyles(expectedRadius) {
	return {
		borderTopLeftRadius: `${expectedRadius[0]}px`,
		borderTopRightRadius: `${expectedRadius[1]}px`,
		borderBottomLeftRadius: `${expectedRadius[2]}px`,
		borderBottomRightRadius: `${expectedRadius[3]}px`,
	};
}

export async function assertShapeStyles(element, shape, position) {
	const shapeRadius = {
		rounded:
			position == 'left' ? [4, 0, 4, 0] : position == 'right' ? [0, 4, 0, 4] : '',
		pill:
			position == 'left'
				? [14, 0, 14, 0]
				: position == 'right'
				? [0, 14, 0, 14]
				: '',
	};

	assertComputedStyle(
		element,
		await borderRadiusStyles(shapeRadius[shape]),
		'::before'
	);
}
