import '@vonage/vvd-core';
import {
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGridColumn
} from './vwc-data-grid-api';
import {
	customElement,
	property,
	LitElement,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		[COLUMN_DEFINITION_COMPONENT]: VWCDataGridColumn;
	}
}

/**
 * `vwc-data-grid-column` is a configuration bearer component only
 * - it has not own UI functionality and/or visual semantics/HTML
 * - it reflects exactly the DataGridColumn API
 * - it serves as holder of that configuration, validator of changes and observer and notifier of them
 */
@customElement(COLUMN_DEFINITION_COMPONENT)
export class VWCDataGridColumn extends LitElement implements DataGridColumn {
	@property({ type: String, reflect: true })
	path = '';

	@property({ type: Boolean, reflect: true })
	tree = false;
	@property({ type: Boolean, reflect: true })
	hidden = false;
	@property({ type: Boolean, reflect: true })
	frozen = false;
	@property({ type: Boolean, reflect: true })
	sortable = false;
	@property({ type: Boolean, reflect: true })
	resizable = false;
	@property({ type: String, reflect: true })
	selector = undefined;

	@property({ type: Boolean, reflect: true, attribute: 'auto-width' })
	autoWidth = false;
	@property({ type: String, reflect: true })
	width: string | undefined;

	@property({ type: String, reflect: true })
	header = '';
	@property({ reflect: false, attribute: false })
	headerRenderer = undefined;
	@property({ type: String, reflect: true })
	footer = '';
	@property({ reflect: false, attribute: false })
	footerRenderer = undefined;
	@property({ reflect: false, attribute: false })
	cellRenderer = undefined;

	getColumnConfig(): DataGridColumn {
		return {
			path: this.path,

			tree: this.tree,
			hidden: this.selector ? false : this.hidden,
			frozen: this.frozen,
			sortable: this.selector ? false : this.sortable,
			resizable: this.selector ? false : this.resizable,
			selector: this.selector,

			autoWidth: (this.width || this.selector) ? false : this.autoWidth,
			width: this.selector ? '60px' : this.width,

			header: this.header,
			headerRenderer: this.headerRenderer,
			footer: this.footer,
			footerRenderer: this.footerRenderer,
			cellRenderer: this.selector ? undefined : this.cellRenderer
		};
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	protected updated(): void {
		//	TODO: after the limitations of co-existing definitions are clear - add more validations here
		if (this.selector) {
			this.verifySelectorViolations();
		}
		if (this.width) {
			this.verifyWidthViolations();
		}
		this.dispatchEvent(new Event(COLUMN_DEFINITION_UPDATE_EVENT, { bubbles: true }));
	}

	private verifySelectorViolations() {
		if (this.cellRenderer) {
			console.warn('column MAY NOT have both \'selector\' and \'cellRenderer\'; \'cellRenderer\' will be ignored');
		}
		if (this.width || this.autoWidth) {
			console.warn('column MAY NOT have both \'selector\' and \'width\'/\'autoWidth\'; \'width\'/\'autoWidth\' will be ignored');
		}
	}

	private verifyWidthViolations() {
		if (this.autoWidth) {
			console.error('\'width\' and \'autoWidth\' MUST NOT be used both; \'width\' will be used');
		}
	}
}
