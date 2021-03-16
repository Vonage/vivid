import {
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	SELECTOR_SINGLE,
	SELECTOR_MULTI,
	DataGridColumn
} from './vwc-data-grid-column-api';
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
	path?: string = undefined;

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
	@property({
		type: String,
		reflect: true,
		converter: v => (v === SELECTOR_SINGLE || v === SELECTOR_MULTI ? v : undefined)
	})
	selector?: string = undefined;

	@property({ type: Boolean, reflect: true, attribute: 'auto-width' })
	autoWidth = false;
	@property({ type: String, reflect: true })
	width?: string = undefined;

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
			resizable: this.resizable,
			selector: this.selector,

			autoWidth: this.width ? false : this.autoWidth,
			width: this.width,

			header: this.header,
			headerRenderer: this.headerRenderer,
			footer: this.footer,
			footerRenderer: this.footerRenderer,
			cellRenderer: this.cellRenderer
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
		if (this.sortable) {
			console.warn('column MAY NOT have both \'selector\' and \'sortable\'; \'sortable\' will be ignored');
		}
		if (this.hidden) {
			console.warn('column MAY NOT have both \'selector\' and \'hidden\'; \'hidden\' will be ignored');
		}
	}

	private verifyWidthViolations() {
		if (this.autoWidth) {
			console.error('\'width\' and \'autoWidth\' MUST NOT be used both; \'width\' will be used');
		}
	}
}
