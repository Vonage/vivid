import { LitElement, property } from 'lit-element';
import type { VWCExpansionPanelBase } from '@vonage/vwc-expansion-panel/vwc-expansion-panel-base';

export abstract class VWCAccordionBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	multi = false;

	private expansionPanels: HTMLCollectionOf<VWCExpansionPanelBase> | undefined = undefined;

	constructor() {
		super();
		this.addEventListener('opened', this.handleOpened);
	}

	override connectedCallback(): void {
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
		const opened: VWCExpansionPanelBase[] = [];

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
