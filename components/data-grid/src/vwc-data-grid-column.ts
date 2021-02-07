import { ColDefUtil, ColDef } from '@ag-grid-community/all-modules';
import {
	customElement,
	LitElement,
	PropertyDeclaration,
	PropertyDeclarations,
} from 'lit-element';
import { hypenateAndLowercase } from './utils';

@customElement('vwc-data-grid-column')
export class VWCDataGridColumn extends LitElement {
	static get properties(): PropertyDeclarations {
		const addProperties = (
			target: { [key: string]: PropertyDeclaration },
			properties: string[],
			type: unknown
		) =>
			properties.forEach((key) => {
				target[key.toLowerCase()] = <PropertyDeclaration>{ type, reflect: false };
				target[key] = <PropertyDeclaration>{ type, reflect: false };
			});

		const properties = {};

		addProperties(properties, ColDefUtil.BOOLEAN_PROPERTIES, Boolean);
		addProperties(properties, ColDefUtil.STRING_PROPERTIES, String);
		addProperties(properties, ColDefUtil.NUMBER_PROPERTIES, Number);
		addProperties(properties, ColDefUtil.OBJECT_PROPERTIES, Object);
		addProperties(properties, ColDefUtil.ARRAY_PROPERTIES, Array);
		addProperties(properties, ColDefUtil.FUNCTION_PROPERTIES, Object);
		addProperties(properties, ColDefUtil.FRAMEWORK_PROPERTIES, Object);

		return properties;
	}

	#propertyMap: { [key: string]: string } = {};

	constructor() {
		super();

		this.#propertyMap = this.createPropertyMap();
	}

	protected createPropertyMap = (): { [key: string]: string } =>
		ColDefUtil.ALL_PROPERTIES.reduce(
			(map: { [key: string]: string }, name: string) => {
				map[name.toLowerCase()] = name;
				map[hypenateAndLowercase(name)] = name;
				return map;
			},
			{}
		);

	toColDef(): ColDef {
		const result = {};

		Object.keys(VWCDataGridColumn.properties).map((key) => {
			const gridPropertyName = this.#propertyMap[key] || key;
			const value = (this as any)[key];
			if (value != undefined && gridPropertyName != 'toColDef') {
				(result as any)[gridPropertyName] = value;
			}
		});

		return <ColDef>{ ...result };
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-data-grid-column': VWCDataGridColumn;
	}
}
