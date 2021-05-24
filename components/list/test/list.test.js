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
					expect(listItem).exist;
					assertComputedStyle(listItem, await getTypographyStyle('body-2'));

					if (listItem.shadowRoot) {
						const listTextBase = listItem.shadowRoot.querySelector('.mdc-deprecated-list-item__text');
						expect(listTextBase).exist;
						assertComputedStyle(listTextBase, await getTypographyStyle('body-2'));
					}

					if ('twoline' in listItem) {
						listItem.twoline = true;
						await listItem.updateComplete;
						const listTextPrim = listItem.shadowRoot.querySelector('.mdc-deprecated-list-item__primary-text');
						expect(listTextPrim).exist;
						assertComputedStyle(listTextPrim, await getTypographyStyle('body-2-bold'));
						const listTextSecond = listItem.shadowRoot.querySelector('.mdc-deprecated-list-item__secondary-text');
						expect(listTextSecond).exist;
						assertComputedStyle(listTextSecond, await getTypographyStyle('caption'));
					}
				});
			}
		}
	});

	describe('connotation', () => {
		let list,
			ripple;
		beforeEach(async () => {
			[list] = addElement(
				textToDomToParent(`
					<vwc-list>
						<vwc-list-item activated>Item 1</vwc-list-item>
					</vwc-list>
				`)
			);
			await waitNextTask();
			const listItem = list.querySelector('vwc-list-item');
			ripple = listItem.shadowRoot.querySelector('.fake-activated-ripple');
		});

		it('should proxy primary connotation to activated list-item by default', async () => {
			assertComputedStyle(ripple, { backgroundColor: 'rgb(0,0,0)' }, ':before');
		});

		it('should proxy cta connotation to activated list-item when connotation set to cta', async () => {
			list.connotation = 'cta';
			await waitNextTask();
			assertComputedStyle(ripple, { backgroundColor: 'rgb(153,65,255)' }, ':before');
		});
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
