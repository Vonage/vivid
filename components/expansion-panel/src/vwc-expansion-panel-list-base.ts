import { LitElement, property } from 'lit-element';
import { VWCExpansionPanelBase } from './vwc-expansion-panel-base.js';

/* TODO
 * - add nested panel support
 * - verify items in expansionPanels list
 */

export abstract class VWCExpansionPanelListBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	multi = false;

	private expansionPanels: HTMLCollectionOf<VWCExpansionPanelBase> | undefined = undefined;

	constructor() {
		super();
		this.addEventListener('opened', this.handleOpened);
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.expansionPanels = this.children as HTMLCollectionOf<VWCExpansionPanelBase>;
	}

	handleOpened(e: Event): any {
		if (!this.multi && this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				if (expansionPanel !== e.target) expansionPanel.close();
			}
		}
	}

	getOpened(): Array<VWCExpansionPanelBase> {
		const opened = [];

		if (this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				if (expansionPanel.open === true) opened.push(expansionPanel);
			}
		}

		return opened;
	}

	openAll(): void {
		if (this.multi && this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				expansionPanel.show();
			}
		}
	}

	closeAll(): void {
		if (this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				expansionPanel.close();
			}
		}
	}
}
