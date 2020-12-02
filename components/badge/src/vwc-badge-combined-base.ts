import { html, LitElement, property, TemplateResult, query } from 'lit-element';
import { Connotation, Shape } from '@vonage/vvd-foundation/constants';
import { Badge } from './vwc-badge';

export class BadgeCombinedBase extends LitElement {
	@query('slot') protected badgesSlot!: HTMLElement;

	@property({ type: String, reflect: true })
	connotation?: Connotation;

	@property({ type: String, reflect: true })
	shape?: Shape;

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('dense')) {
			if (this.dense && this.enlarged) {
				this.enlarged = false;
			}
		}

		if (changes.has('enlarged')) {
			if (this.enlarged && this.dense) {
				this.dense = false;
			}
		}

		const badges = this._getBadges();
		badges &&
			badges.forEach((badge) => {
				this.connotation && badge.setAttribute('connotation', this.connotation);
				badge.toggleAttribute('dense', this.dense);
				badge.toggleAttribute('enlarged', this.enlarged);
				badge.toggleAttribute('disabled', this.disabled);
			});
	}

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}

	private _getBadges() {
		return (this.badgesSlot as HTMLSlotElement)
			.assignedNodes({ flatten: true })
			.filter((e: Node) => e instanceof Badge) as Badge[];
	}
}
