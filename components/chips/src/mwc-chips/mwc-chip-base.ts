/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { BaseElement } from '@material/mwc-base/base-element.js';
import { observer } from '@material/mwc-base/observer.js';
import { addHasRemoveClass } from '@material/mwc-base/utils.js';
import { MDCChipAdapter } from '@material/chips/chip/adapter.js';
import { MDCChipFoundation } from '@material/chips/chip/foundation.js';
import {
	MDCChipInteractionEventDetail,
	MDCChipSelectionEventDetail,
	MDCChipRemovalEventDetail,
	MDCChipNavigationEventDetail,
} from '@material/chips/chip/types';
import { html, property, query } from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

/* eslint-disable no-void */
function NOOP(): void {
	void 0;
}

export class ChipBase extends BaseElement {
	@query('.mdc-chip') protected mdcRoot!: HTMLElement;
	protected mdcFoundation!: MDCChipFoundation;
	protected readonly mdcFoundationClass = MDCChipFoundation;

	@property()
	label = '';
	@property({ reflect: true })
	type?: ChipType;
	@property({ type: Boolean })
	get selected(): boolean {
		return this._selected;
	}

	set selected(selected: boolean) {
		this._selected = selected;
		this.mdcFoundation?.setSelected(selected);
	}

	private _selected = false;

	@property()
	icon = '';
	@property()
	iconClass = 'material-icons';
	@property({ type: Boolean })
	@observer(function (this: ChipBase, value: boolean) {
		this.mdcFoundation.setShouldRemoveOnTrailingIconClick(value);
	})
	removable = false;
	@property()
	removeIcon = 'close';
	@property()
	removeIconClass = 'material-icons';
	@property({ type: Boolean })
	removeIconFocusable = false;

	@query(MDCChipFoundation.strings.LEADING_ICON_SELECTOR)
	protected leadingIconElement!: HTMLElement | null;
	@query(MDCChipFoundation.strings.CHECKMARK_SELECTOR)
	protected checkmarkElement!: HTMLElement | null;
	@query(MDCChipFoundation.strings.PRIMARY_ACTION_SELECTOR)
	protected primaryActionElement!: HTMLElement | null;
	@query(MDCChipFoundation.strings.TRAILING_ACTION_SELECTOR)
	protected trailingActionElement!: HTMLElement | null;

	protected createAdapter(): MDCChipAdapter {
		return {
			...addHasRemoveClass(this.mdcRoot),
			addClassToLeadingIcon: (className: string) => {
				if (this.leadingIconElement) {
					this.leadingIconElement.classList.add(className);
				}
			},
			eventTargetHasClass: (target: HTMLElement, className: string) =>
				target ? (target as Element).classList.contains(className) : false,
			focusPrimaryAction: () => {
				if (this.primaryActionElement) {
					this.primaryActionElement.focus();
				}
			},
			focusTrailingAction: () => {
				if (this.trailingActionElement) {
					this.trailingActionElement.focus();
				}
			},
			getAttribute: (attrName: string) => {
				return this.mdcRoot.getAttribute(attrName);
			},
			getCheckmarkBoundingClientRect: () =>
				this.checkmarkElement && this.checkmarkElement.getBoundingClientRect(),
			getComputedStyleValue: (propertyName) =>
				getComputedStyle(this.mdcRoot).getPropertyValue(propertyName),
			getRootBoundingClientRect: () => this.mdcRoot.getBoundingClientRect(),
			hasLeadingIcon: () => !!this.leadingIconElement,
			isRTL: () =>
				getComputedStyle(this.mdcRoot).getPropertyValue('direction') === 'rtl',
			isTrailingActionNavigable: () => {
				return (
					this.trailingActionElement &&
					/* eslint-disable @typescript-eslint/no-explicit-any */
					(this.trailingActionElement as any).isNavigable()
				);
			},
			notifyInteraction: () => {
				const detail: MDCChipInteractionEventDetail = { chipId: this.id };
				this.dispatchEvent(
					new CustomEvent(MDCChipFoundation.strings.INTERACTION_EVENT, {
						detail,
						bubbles: true,
						composed: true,
					})
				);
			},
			notifyNavigation: (key, source) => {
				const detail: MDCChipNavigationEventDetail = {
					chipId: this.id,
					key,
					source,
				};
				this.dispatchEvent(
					new CustomEvent(MDCChipFoundation.strings.NAVIGATION_EVENT, {
						detail,
						bubbles: true,
						composed: true,
					})
				);
			},
			notifyRemoval: () => this.dispatchRemovalEvent(),
			notifySelection: (selected, shouldIgnore) => {
				const detail: MDCChipSelectionEventDetail = {
					chipId: this.id,
					selected,
					shouldIgnore,
				};
				this.dispatchEvent(
					new CustomEvent(MDCChipFoundation.strings.SELECTION_EVENT, {
						detail,
						bubbles: true,
						composed: true,
					})
				);
			},
			notifyTrailingIconInteraction: () => {
				const detail: MDCChipInteractionEventDetail = { chipId: this.id };
				this.dispatchEvent(
					new CustomEvent(
						MDCChipFoundation.strings.TRAILING_ICON_INTERACTION_EVENT,
						{
							detail,
							bubbles: true,
							composed: true,
						}
					)
				);
			},
			notifyEditStart: NOOP,
			notifyEditFinish: NOOP,
			removeClassFromLeadingIcon: (className: string) => {
				if (this.leadingIconElement) {
					this.leadingIconElement.classList.remove(className);
				}
			},
			removeTrailingActionFocus: () => {
				if (this.trailingActionElement) {
					((this
						.trailingActionElement as unknown) as MDCChipFoundation).removeFocus();
				}
			},
			setPrimaryActionAttr: (attr: string, value: string) => {
				if (this.primaryActionElement) {
					this.primaryActionElement.setAttribute(attr, value);
				}
			},
			setStyleProperty: (propertyName, value) =>
				this.mdcRoot.style.setProperty(propertyName, value),
		};
	}

	focusPrimaryAction(): void {
		this.mdcFoundation.focusPrimaryAction();
	}

	focusTrailingAction(): void {
		this.mdcFoundation.focusTrailingAction();
	}

	removeFocus(): void {
		this.mdcFoundation.removeFocus();
	}

	setSelectedFromChipSet(selected: boolean, shouldNotifyClients: boolean): void {
		const oldValue = this._selected;
		this._selected = selected;
		this.mdcFoundation.setSelectedFromChipSet(selected, shouldNotifyClients);
		this.requestUpdate('selected', oldValue);
	}

	removeWithAnimation(): void {
		this.mdcFoundation.beginExit();
	}

	render(): TemplateResult {
		const classes = {
			'mdc-chip--selected': this.selected,
			'mdc-chip--deletable': this.removable,
		};

		return html`
			<div
				class="mdc-chip ${classMap(classes)}"
				role="row"
				@click=${this.handleInteraction}
				@keydown=${this.handleKeydown}
				@transitionend=${this.handleTransitionEnd}
			>
				${this.renderThumbnail()} ${this.renderCheckmark()}
				${this.renderPrimaryAction()} ${this.renderRemoveIcon()}
			</div>
		`;
	}

	renderLabel(): TemplateResult {
		return html`${this.label}`;
	}

	renderThumbnail(): TemplateResult {
		if (this.icon) {
			return html`<i
				class="mdc-chip__icon mdc-chip__icon--leading ${this.iconClass}"
			>
				${this.icon}
			</i>`;
		} else if (this.childElementCount > 0) {
			return html` <span class="mdc-chip__icon mdc-chip__icon--leading">
				<slot name="thumbnail"></slot>
			</span>`;
		} else {
			return html``;
		}
	}

	renderCheckmark(): TemplateResult {
		return html`${this.type === 'filter'
			? html` <span class="mdc-chip__checkmark">
					<svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
						<path
							class="mdc-chip__checkmark-path"
							fill="none"
							stroke="currentColor"
							d="M1.73,12.91 8.1,19.28 22.79,4.59"
						/>
					</svg>
			  </span>`
			: nothing}`;
	}

	renderPrimaryAction(): TemplateResult {
		const isFilter = this.type === 'filter';
		const role = isFilter ? 'checkbox' : 'button';
		const ariaChecked = isFilter ? String(this.selected) : undefined;
		return html` <span
			class="mdc-chip__text mdc-chip__primary-action"
			role="${role}"
			tabindex="0"
			aria-checked=${ifDefined(ariaChecked)}
		>
			${this.renderLabel()}
		</span>`;
	}

	renderRemoveIcon(): TemplateResult {
		const classes = {
			'mdc-chip__trailing-action': this.removeIconFocusable,
			[this.removeIconClass]: true,
		};

		const icon = html`${this.removable
			? html` <i
					class="mdc-chip__icon mdc-chip__icon--trailing ${classMap(classes)}"
					tabindex="-1"
					role=${ifDefined(this.removeIconFocusable ? 'button' : undefined)}
					aria-hidden=${ifDefined(this.removeIconFocusable ? undefined : 'true')}
					@click=${this.handleTrailingIconInteraction}
					@keydown=${this.handleTrailingIconInteraction}
					>${this.removeIcon}</i
			  >`
			: nothing}`;

		if (this.removeIconFocusable) {
			return html`<span role="gridcell">${icon}</span>`;
		} else {
			return icon;
		}
	}

	private dispatchRemovalEvent(): void {
		const detail: MDCChipRemovalEventDetail = {
			chipId: this.id,
			removedAnnouncement: null,
		};
		this.dispatchEvent(
			new CustomEvent(MDCChipFoundation.strings.REMOVAL_EVENT, {
				detail,
				bubbles: true,
				composed: true,
			})
		);
	}

	private handleInteraction(): void {
		this.mdcFoundation.handleClick();
	}

	private handleTransitionEnd(e: TransitionEvent): void {
		this.mdcFoundation.handleTransitionEnd(e);
	}

	private handleTrailingIconInteraction(): void {
		this.mdcFoundation.handleTrailingActionInteraction();
	}

	private handleKeydown(e: KeyboardEvent): void {
		this.mdcFoundation.handleKeydown(e);
	}
}

export type ChipType = 'action' | 'input' | 'choice' | 'filter';
