import '../vwc-button.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-button';

describe('button a11y', () => {
	const addElement = isolatedElementsCreation();

	let actualElement;
	beforeEach(async () => {
		[actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
	});

	it('should be accessible', (done) => {
		axe.run(actualElement, (err, result) => {
			if (err) done(err);

			try {
				expect(err).to.be.null;
				expect(result.violations.length).to.equal(0);
				done();
			} catch (e) {
				console.log(result.violations);
				done(e);
			}
		});
	});
});
