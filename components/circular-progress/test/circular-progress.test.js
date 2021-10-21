import '../vwc-circular-progress.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';
import { Connotation } from '@vonage/vvd-foundation/constants.js';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-circular-progress';

describe('circular progress', () => {
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
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('Connotation', () => {
		const CONNOTATIONS_SUPPORTED = [Connotation.Primary, Connotation.CTA, Connotation.Success, Connotation.Alert];

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
					childrenAffected: ['.mdc-circular-progress__determinate-circle', '.mdc-circular-progress__indeterminate-circle-graphic'],
					stylesAffected: ['stroke'],
				});
			});

			it(`should reflect '${connotation}' connotation (property) visually`, async () => {
				const [linearProgress] = addElement(
					textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
				);
				await assertConnotationProperty({
					element: linearProgress,
					connotation: connotation,
					childrenAffected: ['.mdc-circular-progress__determinate-circle', '.mdc-circular-progress__indeterminate-circle-graphic'],
					stylesAffected: ['stroke'],
				});
			});
		}
	});
});
