import { LitElement, property } from 'lit-element';
import type { VWCExpansionPanelBase } from '@vonage/vwc-expansion-panel/vwc-expansion-panel-base.js';
import type { Layout } from '@vonage/vvd-foundation/constants.js';

type AccordionAppearance = Extract<
	Layout,
	Layout.Filled | Layout.Outlined | Layout.Soft
	>;


export abstract class VWCAccordionBase extends LitElement {
	@property({ type: Boolean, reflect: true })
		multi = false;

	@property({ type: String, reflect: true })
		Appearance?: AccordionAppearance;



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
