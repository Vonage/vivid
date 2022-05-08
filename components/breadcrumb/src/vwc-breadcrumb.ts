import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import {breadcrumbTemplate as template, DesignSystem} from '@microsoft/fast-foundation';
import { Breadcrumb as FoundationElement } from '@microsoft/fast-foundation';
import {css} from '@microsoft/fast-element';

const styles = css`
	.list {
		display: flex;
	}
`;
/**
 * Base class for breadcrumb
 *
 * @public
 */
export class Breadcrumb extends FoundationElement {

}
export const vividBreadcrumb = Breadcrumb.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb',
	template,
	styles,
});

DesignSystem.getOrCreate().withPrefix('vwc').register(vividBreadcrumb());

