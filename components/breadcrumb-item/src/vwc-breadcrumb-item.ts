
import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { DesignSystem, BreadcrumbItem as FastBreadcrumbItem } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import {BreadcrumbItemTemplate as template} from './vwc-breadcrumb-item.template.js';
import { style as styles } from './vwc-breadcrumb-item.css.js';

/**
 * Base class for breadcrumb-item
 *
 * @public
 */
export class BreadcrumbItem extends FastBreadcrumbItem {
	@attr({ mode: 'fromView' })	text: string = '';

	constructor() {
		super();
	}
}

export const vividBreadcrumbItem = BreadcrumbItem.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb-item',
	template: template as any,
	styles,
});

DesignSystem.getOrCreate().withPrefix('vwc').register(vividBreadcrumbItem());
