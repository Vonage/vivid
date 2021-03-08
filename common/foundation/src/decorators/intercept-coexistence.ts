import { UpdatingElement } from 'lit-element';

export function interceptCoexistence(...properties: string[]) {
	return <T extends { new (...args: any[]): UpdatingElement }>(constructor: T): any => class extends constructor {
		update(changes: Map<string, boolean>): void {
			super.update(changes);
			const firstChangedProperty = properties.find((p: string) => changes.has(p) && (this as any)[p]);
			if (firstChangedProperty) {
				const opposingProperty = properties.find((p: string) => firstChangedProperty != p && (this as any)[p]);
				if (opposingProperty) { console?.warn(`"${firstChangedProperty}" conflict with "${opposingProperty}"`); }
			}
		}
	};
}
