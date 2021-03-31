import { LitElement, property } from 'lit-element';
import { VWCExpansionPanelBase } from './vwc-expansion-panel-base.js';

export abstract class VWCExpansionPanelListBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	multi = false;

	@property({ type: Boolean, reflect: true })
	openAll = false;

	private expansionPanels: HTMLCollectionOf<VWCExpansionPanelBase> | undefined = undefined;

	constructor() {
		super();
		this.addEventListener('opened', this.handleOpened);
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.expansionPanels = this.children as HTMLCollectionOf<VWCExpansionPanelBase>;

		if (this.multi && this.openAll && this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				expansionPanel.open = true;
			}
		}
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

	closeAll(): void {
		if (this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				expansionPanel.close();
			}
		}
	}
}
