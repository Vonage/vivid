import { LitElement, property } from 'lit-element';
import { observer } from '@material/mwc-base/observer';

/**
 * Base class for expansion panel behaviour
 *
 * @beta
 * */
export abstract class VWCExpansionPanelBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	@observer(function (
		this: VWCExpansionPanelBase,
		isOpen: boolean,
		wasOpen: boolean
	) {
		if (isOpen) {
			this.show();
			// wasOpen helps with first render (when it is `undefined`) perf
		} else if (wasOpen !== undefined) {
			this.close();
		}

		this.openChanged(isOpen);
	})
	open = false;

	/**
	 * Invoked when the element open state is updated.
	 *
	 * Expressions inside this method will trigger upon open state change
	 *
	 * @param _isOpen Boolean of open state
	 */ protected openChanged(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_isOpen: boolean
		// eslint-disable-next-line @typescript-eslint/no-empty-function
	): void {}

	close(): void {
		this.open = false;
		this.notifyClose();
	}

	show(): void {
		this.open = true;
		this.notifyOpen();
	}

	notifyClose(): void {
		const init: CustomEventInit = { bubbles: true, composed: true };
		const ev = new CustomEvent('closed', init);
		this.open = false;
		this.dispatchEvent(ev);
	}

	notifyOpen(): void {
		const init: CustomEventInit = { bubbles: true, composed: true };
		const ev = new CustomEvent('opened', init);
		this.open = true;
		this.dispatchEvent(ev);
	}
}
