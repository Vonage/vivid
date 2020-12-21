import {
	customElement,
	html,
	LitElement,
	property,
	TemplateResult,
} from 'lit-element';
import { observer } from '@material/mwc-base/observer';

import { style } from './vwc-list-expansion-panel.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list-expansion-panel': VWCListExpansionPanel;
	}
}

/**
 * This component support expand-collapse list
 */
@customElement('vwc-list-expansion-panel')
export class VWCListExpansionPanel extends LitElement {
	static styles = style;

	@property({ type: Boolean, reflect: true })
	@observer(function (
		this: VWCListExpansionPanel,
		isOpen: boolean,
		wasOpen: boolean
	) {
		if (isOpen) {
			this.show();
			// wasOpen helps with first render (when it is `undefined`) perf
		} else if (wasOpen !== undefined) {
			this.close();
		}

		this.notifyChange(isOpen);
	})
	open = false;

	@property({ type: Boolean }) quick = false;

	close(): void {
		this.notifyClose();
		this.open = false;
	}

	show(): void {
		this.notifyOpen();
		this.open = true;
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

	notifyChange(isOpen: boolean): void {
		const init: CustomEventInit = {
			bubbles: true,
			composed: true,
			detail: { open: isOpen },
		};
		const ev = new CustomEvent('changed', init);
		this.dispatchEvent(ev);
	}

	render(): TemplateResult {
		return html`<div class="expansion-panel"><slot></slot></div>`;
	}
}
