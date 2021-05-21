import '../vwc-list.js';
import {
	assertComputedStyle,
	isolatedElementsCreation,
	getTypographyStyle,
	textToDomToParent,
	waitNextTask,
} from '../../../test/test-helpers';
import { borderRadiusStyles, shapeStyles } from '../../../test/style-utils';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-list';
const TYPOGRAPHY_CHILDREN_TO_TEST = [
	'vwc-check-list-item',
	'vwc-list-item',
	'vwc-radio-list-item',
	'div',
];
const TYPOGRAPHY_FLAVORS_TO_TEST = ['', 'selected'];

describe('list', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				`${COMPONENT_NAME} element is not defined`
			)
		);
	});

	it('should have internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const actualElement = addedElements[0];
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('typography', () => {
		for (const childType of TYPOGRAPHY_CHILDREN_TO_TEST) {
			for (const flavor of TYPOGRAPHY_FLAVORS_TO_TEST) {
				it(`should have set typography correct (child type '${childType}', flavor '${flavor}')`, async () => {
					const [list] = addElement(
						textToDomToParent(
							`<vwc-list><${childType} ${flavor}>Item 1</${childType}></vwc-list>`
						)
					);
					await waitNextTask();
					const listItem = list.children[0];
					expect(listItem).to.exist;
					assertComputedStyle(listItem, await getTypographyStyle('body-2'));
				});
			}
		}
	});

	describe('shape', () => {
		let list,
			listItem;
		beforeEach(async () => {
			[list] = addElement(
				textToDomToParent(`
					<vwc-list>
						<vwc-list-item>Item 1</vwc-list-item>
					</vwc-list>
				`)
			);
			await waitNextTask();
			listItem = list.querySelector('vwc-list-item');
		});

		it('should not proxy shape to list-item by default', async () => {
			assertComputedStyle(listItem, borderRadiusStyles('0px'));
		});

		it('should proxy rounded shape to list-item when shape set to rounded', async () => {
			list.shape = 'rounded';
			await waitNextTask();
			assertComputedStyle(listItem, shapeStyles('rounded'));
		});
	});
});
