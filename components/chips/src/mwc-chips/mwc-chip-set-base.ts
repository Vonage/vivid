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
import { announce } from '@material/dom/announce';
import { addHasRemoveClass } from '@material/mwc-base/utils.js';
import type {
	MDCChipInteractionEvent,
	MDCChipSelectionEvent,
	MDCChipRemovalEvent,
	MDCChipNavigationEvent,
} from '@material/chips/chip/types';
import type { MDCChipSetAdapter } from '@material/chips/chip-set/adapter.js';
import { MDCChipSetFoundation } from '@material/chips/chip-set/foundation.js';
import { html, property, query, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { ChipBase, ChipType } from './mwc-chip-base.js';

let chipIdCounter = 0;

export class ChipSetBase extends BaseElement {
	@query('.mdc-chip-set') protected mdcRoot!: HTMLElement;
	protected mdcFoundation!: MDCChipSetFoundation;
	protected readonly mdcFoundationClass = MDCChipSetFoundation;

	@property()
	@observer(function (this: ChipSetBase, value: ChipType) {
		for (const chip of this.chipsArray) {
			chip.type = value;
		}
	})
	type?: ChipType;

	get chips(): ReadonlyArray<ChipBase> {
		return this.chipsArray.slice();
	}

	private chipsArray: ChipBase[] = [];
	private chipsObserver = new MutationObserver(() => this.syncChips());

	protected createAdapter(): MDCChipSetAdapter {
		return {
			hasClass: addHasRemoveClass(this.mdcRoot).hasClass,
			announceMessage: function (message) {
				announce(message);
			},
			removeChipAtIndex: (index) => {
				const chip = this.chipsArray[index];
				if (chip) {
					if (chip.parentNode) {
						chip.parentNode.removeChild(chip);
					}

					this.chipsArray.splice(index, 1);
				}
			},
			selectChipAtIndex: (index, isSelected, shouldNotifyClients) => {
				const chip = this.chipsArray[index];
				if (chip) {
					chip.setSelectedFromChipSet(isSelected, shouldNotifyClients);
				}
			},
			getIndexOfChipById: (chipId) => {
				for (let i = 0; i < this.chipsArray.length; i++) {
					if (this.chipsArray[i].id === chipId) {
						return i;
					}
				}

				return -1;
			},
			focusChipPrimaryActionAtIndex: (index) => {
				const chip = this.chipsArray[index];
				if (chip) {
					chip.focusPrimaryAction();
				}
			},
			focusChipTrailingActionAtIndex: (index) => {
				const chip = this.chipsArray[index];
				if (chip) {
					this.chipsArray[index].focusTrailingAction();
				}
			},
			removeFocusFromChipAtIndex: (index) => {
				const chip = this.chipsArray[index];
				if (chip) {
					this.chipsArray[index].removeFocus();
				}
			},
			isRTL: () =>
				getComputedStyle(this.mdcRoot).getPropertyValue('direction') === 'rtl',
			getChipListCount: () => this.chipsArray.length,
		};
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.chipsObserver.observe(this, {
			childList: true,
			subtree: true,
		});

		this.syncChips();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.chipsObserver.disconnect();
	}

	override render(): TemplateResult {
		const classes = {
			'mdc-ship-set--input': this.type === 'input',
			'mdc-chip-set--choice': this.type === 'choice',
			'mdc-chip-set--filter': this.type === 'filter',
		};

		return html` <div
			class="mdc-chip-set ${classMap(classes)}"
			@MDCChip:interaction=${this.handleChipInteraction}
			@MDCChip:navigation=${this.handleChipNavigation}
			@MDCChip:removal=${this.handleChipRemoval}
			@MDCChip:selection=${this.handleChipSelection}
		>
			<slot></slot>
		</div>`;
	}

	protected syncChips(): void {
		const chips = this.queryChips();
		for (const chip of chips) {
			chip.type = this.type;
			chip.id = chip.id || this.nextChipId();
			if (chip.selected) {
				this.mdcFoundation.select(chip.id);
			}
		}

		this.chipsArray = chips;
	}

	protected nextChipId(): string {
		return `mwc-chip-${++chipIdCounter}`;
	}

	protected queryChips(): ChipBase[] {
		const chips: ChipBase[] = [];
		const collectChips = (root: Element) => {
			for (const child of Array.from(root.children)) {
				if (child instanceof ChipBase) {
					chips.push(child);
				} else {
					collectChips(child);
				}
			}
		};

		collectChips(this);
		return chips;
	}

	private handleChipInteraction(e: MDCChipInteractionEvent): void {
		this.mdcFoundation.handleChipInteraction(e.detail);
	}

	private handleChipSelection(e: MDCChipSelectionEvent): void {
		this.mdcFoundation.handleChipSelection(e.detail);
	}

	private handleChipRemoval(e: MDCChipRemovalEvent): void {
		this.mdcFoundation.handleChipRemoval(e.detail);
	}

	private handleChipNavigation(e: MDCChipNavigationEvent): void {
		this.mdcFoundation.handleChipNavigation(e.detail);
	}
}
