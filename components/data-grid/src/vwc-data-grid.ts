import '@vonage/vvd-core';
import {
	customElement,
	property,
	LitElement,
	PropertyValues,
	PropertyDeclarations,
	PropertyDeclaration,
	CSSResult,
} from 'lit-element';
import { style as vwcDataGridStyle } from './vwc-data-grid.css';
import {
	AgGridEvent,
	ComponentUtil,
	Grid,
	GridOptions,
	Events,
	GridParams,
	AllCommunityModules,
	GridApi,
	ColumnApi,
	GridCore,
} from '@ag-grid-community/all-modules';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-data-grid': VWCDataGrid;
	}
}

const emitCustomEventFactory = (target: HTMLElement) => (
		eventType: string,
		detail: unknown,
		options = { bubbles: true, composed: true }
	) => {
		const event = new CustomEvent(eventType, { ...options, detail });
		target.dispatchEvent(event);
	},
	hypenateAndLowercase = (input: string): string =>
		input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 *
 * @fires agGridEvent - Fires Ag-Grid event
 *
 */
@customElement('vwc-data-grid')
export class VWCDataGrid extends LitElement {
	static DEFAULT_ROW_HEIGHT = 30;

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

		addProperties(properties, ComponentUtil.BOOLEAN_PROPERTIES, Boolean);
		addProperties(properties, ComponentUtil.STRING_PROPERTIES, String);
		addProperties(properties, ComponentUtil.OBJECT_PROPERTIES, Object);
		addProperties(properties, ComponentUtil.ARRAY_PROPERTIES, Array);
		addProperties(properties, ComponentUtil.FUNCTION_PROPERTIES, Object);

		return properties;
	}

	@property({ type: Grid })
	grid: Grid | undefined;

	@property({ type: Object })
	set options(value: GridOptions) {
		if (!this.#initialized) {
			this.#gridOptions = {
				...this.#gridOptions,
				...value,
			};
			this.requestUpdate('options', null);
		} else {
			throw new Error(
				'Grid already instantiated, please use "element.api" directly to mutate options in runtime'
			);
		}
	}

	get options(): GridOptions {
		return this.#gridOptions;
	}

	#initialized = false;
	#defaultPopupParentSet = false;
	#gridOptions = <GridOptions>{
		headerHeight: VWCDataGrid.DEFAULT_ROW_HEIGHT,
		rowHeight: VWCDataGrid.DEFAULT_ROW_HEIGHT,
	};
	#attributes: { [key: string]: unknown } = {};
	#propertyMap: { [key: string]: string } = {};

	emitCustomEvent = emitCustomEventFactory(this);

	constructor() {
		super();

		this.#propertyMap = this.createPropertyMap();
	}

	get api(): GridApi | null | undefined {
		return this.#gridOptions.api;
	}

	get columnApi(): ColumnApi | null | undefined {
		return this.#gridOptions.columnApi;
	}

	get gridCore(): GridCore | null | undefined {
		return this.api ? this.api['gridCore'] : undefined;
	}

	get gridElement(): HTMLElement | null | undefined {
		return this.gridCore?.getGui();
	}

	protected updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);

		this.createGrid();

		for (const key of changedProperties.keys()) {
			this.gridPropertyChanged(key as string, changedProperties.get(key));
		}
	}

	protected createPropertyMap = (): { [key: string]: string } =>
		ComponentUtil.ALL_PROPERTIES.concat(ComponentUtil.getEventCallbacks()).reduce(
			(map: { [key: string]: string }, name: string) => {
				map[name.toLowerCase()] = name;
				map[hypenateAndLowercase(name)] = name;
				return map;
			},
			{}
		);

	protected appendStyle(css: CSSResult): void {
		const style = document.createElement('style');
		style.textContent = css.cssText;
		this.renderRoot.appendChild(style);
	}

	protected createGrid(): void {
		if (this.#initialized) {
			return;
		}

		// read un-bound properties directly off the element
		this.#gridOptions = ComponentUtil.copyAttributesToGridOptions(
			this.#gridOptions,
			this
		);

		// ready bound properties off of the mapped attributes property
		this.#gridOptions = ComponentUtil.copyAttributesToGridOptions(
			this.#gridOptions,
			this.#attributes
		);

		const gridParams = <GridParams>{
			globalEventListener: this.globalEventListener.bind(this),
			modules: AllCommunityModules,
		};

		this.grid = new Grid(
			this.renderRoot as HTMLElement,
			this.options,
			gridParams
		);
		this.gridElement?.classList.add('ag-theme-vivid');

		this.appendStyle(vwcDataGridStyle);

		this.#initialized = true;
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	protected gridPropertyChanged(name: string, newValue: unknown): void {
		const gridPropertyName = this.#propertyMap[name] || name;

		// for properties set before gridOptions is called
		this.#attributes[gridPropertyName] = newValue;

		if (this.#initialized && this.api && this.columnApi) {
			// for subsequent (post gridOptions) changes
			ComponentUtil.processOnChange(
				{ [gridPropertyName]: { currentValue: newValue } },
				this.#gridOptions,
				this.api,
				this.columnApi
			);
		}
	}

	protected globalEventListener(eventType: string, event: AgGridEvent): void {
		if (eventType === Events.EVENT_GRID_READY) {
			this.setDefaultPopupParent();
		}

		this.emitCustomEvent('agGridEvent', event);
	}

	protected setDefaultPopupParent(): void {
		if (
			!this.#defaultPopupParentSet &&
			this.api &&
			this.gridElement &&
			!this.#gridOptions.popupParent
		) {
			this.#defaultPopupParentSet = true;
			this.api.setPopupParent(this.gridElement);
		}
	}
}
