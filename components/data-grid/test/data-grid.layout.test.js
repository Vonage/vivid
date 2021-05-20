import { GRID_COMPONENT, GRID_ENGINE_ROOT_CLASS } from '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	textToDomToParent,
	assertComputedStyle
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';

describe('data grid layout', () => {
	let addElement = isolatedElementsCreation();

	it('should reflect the height of the internal engine as per data-grid component', async () => {
		const [g] = addElement(
			textToDomToParent(`<${GRID_COMPONENT}></${GRID_COMPONENT}>`)
		);
		await g.updateComplete;
		g.columns = getColumns();
		g.items = getItems(30);
		await g.updateComplete;

		let ownHeight = getOwnHeight(g);
		assertHeightOfInternal(g, ownHeight);
		g.style.height = `${parseInt(ownHeight) + 100}px`;

		ownHeight = getOwnHeight(g);
		assertHeightOfInternal(g, ownHeight);
	});
});

function getOwnHeight(grid) {
	return getComputedStyle(grid).height;
}

function assertHeightOfInternal(grid, expectedHeight) {
	const internalEngine = grid.shadowRoot.querySelector(`.${GRID_ENGINE_ROOT_CLASS}`);
	assertComputedStyle(internalEngine, { height: expectedHeight });
}
