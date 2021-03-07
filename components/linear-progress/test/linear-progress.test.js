import '../vwc-linear-progress.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	isolatedElementsCreation,
	textToDomToParent,
	assertComputedStyle,
	waitNextTask,
} from '../../../test/test-helpers';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';
import { Connotation } from '@vonage/vvd-foundation/constants';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-linear-progress';

describe('Linear Progress', () => {
	describe('Basics', () => {
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
			const actualElement = addedElements[0];
			await waitNextTask();
			expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot({
				ignoreAttributes: ['style'],
			});
		});
	});

	describe('API configuration', () => {
		const addElement = isolatedElementsCreation();

		const connotationPrimaryStyle = {
			borderTopWidth: '6px',
			borderTopStyle: 'solid',
			borderTopColor: 'rgb(0, 0, 0)',
			height: '0px',
			blockSize: '0px',
			backgroundImage: 'none'
		};

		const decorationPrimaryStyle = {
			borderTopWidth: '0px',
			borderTopStyle: 'none',
			borderTopColor: 'rgba(0, 0, 0, 0)',
			height: '6px',
			blockSize: '6px',
			backgroundImage: 'linear-gradient(to right, rgb(127, 198, 244), rgb(135, 40, 251))'
		};

		it('should default and style as "connotation > primary"', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} progress="0.5"></${COMPONENT_NAME}>`)
			);

			await waitNextTask();
			const progressBar = actualElement.shadowRoot.querySelector('.mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner');

			assertComputedStyle(progressBar, connotationPrimaryStyle);
		});

		it('should default incorrect connotation value to "connotation > primary" style', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} progress="0.5" connotation="incorrectValue"></${COMPONENT_NAME}>`)
			);

			await waitNextTask();
			const progressBar = actualElement.shadowRoot.querySelector('.mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner');

			assertComputedStyle(progressBar, connotationPrimaryStyle);
		});

		it('should default incorrect decoration value to "connotation > primary" style', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} progress="0.5" decoration="incorrectValue"></${COMPONENT_NAME}>`)
			);

			await waitNextTask();
			const progressBar = actualElement.shadowRoot.querySelector('.mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner');

			assertComputedStyle(progressBar, connotationPrimaryStyle);
		});

		it('should set decoration style', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} progress="0.5" decoration="primary"></${COMPONENT_NAME}>`)
			);

			await waitNextTask();
			const progressBar = actualElement.shadowRoot.querySelector('.mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner');

			assertComputedStyle(progressBar, decorationPrimaryStyle);
		});

		it('should unset decoration if set connotation and vice versa', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} progress="0.5" decoration="primary"></${COMPONENT_NAME}>`)
			);

			await waitNextTask();

			actualElement.connotation = 'primary';

			await waitNextTask();

			expect(actualElement.decoration).to.equal(null);

			actualElement.decoration = 'primary';

			await waitNextTask();

			expect(actualElement.connotation).to.equal(null);
		});
	});

	describe('Connotation', () => {
		const CONNOTATIONS_SUPPORTED = [Connotation.Primary, Connotation.CTA, Connotation.Success, Connotation.Alert];

		const addElement = isolatedElementsCreation();

		it(`should sync linear progress class member 'connotation' and html attribute 'connotation'`, async function () {
			const [linearProgress] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const syncMatchFn = connotation => linearProgress.connotation == connotation &&
				linearProgress.getAttribute('connotation') == connotation;

			let connotationValue = 'cta';
			linearProgress.connotation = connotationValue;
			await waitNextTask();
			const propertyChangesAffectsAttribute = syncMatchFn(connotationValue);

			connotationValue = 'primary';
			linearProgress.setAttribute('connotation', connotationValue);
			await waitNextTask();
			const attributeChangesAffectsProperty = syncMatchFn(connotationValue);

			expect(
				propertyChangesAffectsAttribute,
				'Property change did not apply to attribute'
			).to.equal(true);
			expect(
				attributeChangesAffectsProperty,
				'Attribute change did not apply to property'
			).to.equal(true);
		});

		for (const connotation of CONNOTATIONS_SUPPORTED) {
			it(`should reflect '${connotation}' connotation (attribute) visually`, async () => {
				const [linearProgress] = addElement(
					textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
				);
				await assertConnotationAttribute({
					element: linearProgress,
					connotation: connotation,
					childrenAffected: ['.mdc-linear-progress__bar-inner'],
					stylesAffected: ['borderColor'],
				});
			});

			it(`should reflect '${connotation}' connotation (property) visually`, async () => {
				const [linearProgress] = addElement(
					textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
				);
				await assertConnotationProperty({
					element: linearProgress,
					connotation: connotation,
					childrenAffected: ['.mdc-linear-progress__bar-inner'],
					stylesAffected: ['borderColor'],
				});
			});
		}
	});
});
