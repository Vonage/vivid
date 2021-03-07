import { UpdatingElement } from 'lit-element';

export function precedeOne(...properties: string[]) {
	return <T extends { new (...args: any[]): UpdatingElement }>(constructor: T): any => class extends constructor {
		updated(changes: Map<string, boolean>): void {
			super.updated(changes);
			const nearestChangedProperty = properties.find((p: string) => changes.has(p) && (this as any)[p]);
			if (nearestChangedProperty) {
				properties.forEach((p: string) => {
					if (nearestChangedProperty != p) {
						(this as any)[p] = null;
					}
				});
			}
		}
	};
}
