import { LitElement } from 'lit-element';

export const delegateAttributes =
	(delegationMap: Record<string, string>) => <T extends { new(...args: any[]): LitElement }>(constructor: T): any => {
		const updateDelegation = (baseEl: Element, name: string, value: string | null) => {
			if (delegationMap[name] && value) {
				Array
					.from(((baseEl as LitElement).renderRoot as Element).querySelectorAll(delegationMap[name]))
					.forEach((el) => {
						(baseEl as Element).removeAttribute(name);
						(((value !== undefined ? el.setAttribute : el.removeAttribute).bind(el)) as (a: any, b: any) => void)(name, value);
					});
			}
		};

		// eslint-disable-next-line
		return class extends constructor {
			static get observedAttributes(): string[] {
				return (constructor as any).observedAttributes.concat(Object.keys(delegationMap));
			}

			attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
				super.attributeChangedCallback(name, oldValue, newValue);
				updateDelegation(this, name, newValue);
			}

			firstUpdated(changedProps: Map<string, string>) {
				super.firstUpdated(changedProps);
				Object
					.entries(delegationMap)
					.filter(([name]) => this.hasAttribute(name))
					.forEach(([name]) => this.setAttribute(name, this.getAttribute(name) as string));
			}
		};
	};
