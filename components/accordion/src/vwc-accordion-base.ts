import { LitElement, property } from 'lit-element';
import { VWCExpansionPanelCore } from '@vonage/vwc-expansion-panel';

export abstract class VWCAccordionBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	multi = false;

	private expansionPanels: HTMLCollectionOf<VWCExpansionPanelCore> | undefined = undefined;

	constructor() {
		super();
		this.addEventListener('opened', this.handleOpened);
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.expansionPanels = this.children as HTMLCollectionOf<VWCExpansionPanelCore>;
	}

	handleOpened(e: Event): any {
		if (!this.multi && this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				if (expansionPanel !== e.target) expansionPanel.close();
			}
		}
	}

	getOpened(): Array<VWCExpansionPanelCore> {
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
