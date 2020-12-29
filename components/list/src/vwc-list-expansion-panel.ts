import { VWCIcon } from '@vonage/vwc-icon';
import {
	customElement,
	html,
	PropertyValues,
	queryAssignedNodes,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-list-expansion-panel.css';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { VWCExpansionPanelBase } from '@vonage/vwc-expansion-panel/vwc-expansion-panel-base';
import { assert } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list-expansion-panel': VWCListExpansionPanel;
	}
}

/**
 * This component support expand-collapse list
 */
@customElement('vwc-list-expansion-panel')
export class VWCListExpansionPanel extends VWCExpansionPanelBase {
	static styles = style;

	headerListItemIcon?: VWCIcon;

	// @property({ type: Boolean }) quick = false; // TODO add animation

	@queryAssignedNodes('header', true, 'vwc-list-item')
	headerNodes?: HTMLElement[] | null;

	firstUpdated(changedProperties: PropertyValues): void {
		super.firstUpdated(changedProperties);
		const headerListItem = getHeaderListItem(this.headerNodes);
		this.headerListItemIcon = getHeaderListItemIcon(headerListItem);

		headerListItem.addEventListener('request-selected', () => {
			this.open = !this.open;
		});
	}

	openChanged(isOpen: boolean): void {
		super.openChanged(isOpen);
		(this.headerListItemIcon as Element).setAttribute(
			'type',
			isOpen ? 'up' : 'down'
		);
	}

	render(): TemplateResult {
		return html`<slot name="header"></slot>
			<div class="body"><slot></slot></div>`;
	}
}

/// UTIL FNS

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
	return icon as VWCIcon;
}

function getHeaderListItemIcon(headerListItem: ListItemBase) {
	let icon = headerListItem.querySelector('vwc-icon[slot="meta"]');
	if (!icon) {
		icon = mountIcon(headerListItem);
	}
	return icon as VWCIcon;
}
