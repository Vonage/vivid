import '@vonage/vwc-icon';
import {
	customElement,
	html,
	LitElement,
	property,
	PropertyValues,
	queryAssignedNodes,
	TemplateResult,
} from 'lit-element';
import { observer } from '@material/mwc-base/observer';

import { style } from './vwc-list-expansion-panel.css.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

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

	headerListItemIcon?: unknown;

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

		this.onOpenChange(isOpen);
	})
	open = false;

	// @property({ type: Boolean }) quick = false; // TODO add animation

	@queryAssignedNodes('header', true, 'vwc-list-item')
	headerNodes?: HTMLElement[] | null;

	firstUpdated(changedProperties: PropertyValues): void {
		super.firstUpdated(changedProperties);
		const headerListItem = getHeaderListItem(this.headerNodes);
		this.headerListItemIcon = getHeaderListItemIcon(headerListItem);

		headerListItem.addEventListener(
			'request-selected',
			() => (this.open = !this.open)
		);
	}

	private onOpenChange(isOpen: boolean): void {
		(this.headerListItemIcon as Element).setAttribute(
			'type',
			isOpen ? 'up' : 'down'
		);
	}

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

	render(): TemplateResult {
		return html`<slot name="header"></slot>
			<div class="expansion-panel"><slot></slot></div>`;
	}
}

/// UTIL FNS
function assert(condition: any, msg?: string): asserts condition {
	if (!condition) {
		throw new Error(msg);
	}
}

function getHeaderListItem(headerNodes: unknown) {
	assert(Array.isArray(headerNodes), `Not an array: ${headerNodes}`);
	assert(headerNodes.length > 0, `is empty: ${headerNodes}`);
	const [headerListItem] = headerNodes;
	assert(
		headerListItem instanceof ListItemBase,
		`Not a list item: ${headerListItem}`
	);
	return headerListItem;
}
function mountIcon(headerListItem: ListItemBase) {
	const icon = document.createElement('vwc-icon');
	icon.setAttribute('slot', 'meta');
	headerListItem.appendChild(icon);
	headerListItem.setAttribute('hasMeta', ''); // side effect setting attribute to match icon usage
	return icon;
}

function getHeaderListItemIcon(headerListItem: ListItemBase) {
	let icon = headerListItem.querySelector('vwc-icon[slot="meta"]');
	icon ||= mountIcon(headerListItem);
	return icon;
}
