# `vwc-data-grid`

`vwc-data-grid` component provides a tabular data view.

As in opposite to a simple HTML table, this component is performance oriented, capable of handling large amounts of data efficiently and fully featured from both, API and UX/UI perspective.

Highlights:
- static (all upfront) and dynamic (chunks on demand) data provisioning
- sorting
- tree view (group view)
- expanded row view
- columns management
	- hiding
	- reordering
	- resizing
	- freezing
	- selection (one / all)
- customization
	- columns management features opt in/out
	- header custom rendering
	- footer custom rendering
	- cell custom rendering

# API

Grid API may roughly split into 2 categories:
- configuration / customization
- data

## Data API

Let's introduce shortly the Data API.
More formal description of them found below in the section of the Grid Configuraion / Customization APIs.

There are 2 ways to supply data to grid, via the following grid component properties:
- `items: unknown[]`
	- simplest
	- all data upfront
	- suitale for small to medium amounts of data (in terms of memory occupation)
- `dataProvider: (params: { page: number, pageSize: number }, callback: (pageItems: unknown[], totalItems?: number) => void) => void`
	- stream of chunks, on demand
	- should be used when memory usage concern present (from the data perspectve)

> In case of collision between those 2 (both set to something contentful), error will be printed to the console and `dataProvider` will take precedence.

Some changes to the data, eg 'deep' change within `items` or logical conditions that `dataProvided` works with, won't trigger the refresh of the grid.
Use API below to refresh the data:
- `refreshData(): void`
	- will rerender the visible data in the grid



### `items`

Each new assignment to grid's items property will refresh the grid's content.

Array manipulation (eg `grid.items.splice(0, 1)`) as well is 'deep' data mutations **wont't** trigger grid update.
In such a cases you need to trigger data refresh on demand, via `refreshData` API.

### `dataProvider`

Grid will call `dataProvider` each time new chunk of data needed.
First argument will hold an needed chunk params, page number, page size etc.
Second argumet is the grid's own callback to be called with the fetched / prepared data.

Similarly to the said above, in case the internal conditions changing and you'd like to refresh the data in the grid, call `refreshData` API.

### Selection API

There are few APIs to manage items selection:
- `selectedItems: unknown[]`
	- an Array of selected items (item references taken from the `items` or this provided by `dataProvider`)
- `selectItem(item: unknown, singleSelectMode: boolean = false): void`
	- will add the item to the selected ones (and reflect it in UI if selector column used, or any custom UI that reflects selection)
	- if the `singleSelectMode` switch set to `true`, the API will unselect all previously selected items and leave the provided item as the only selected one
- `unselectItem(item: unkown): void`
	- will remove item from the selected ones
- `selectAll(): void`
	- will add the item to the selected ones (and reflect it in UI if selector column used, or any custom UI that reflects selection); this methid will __throw__ if the data provisioning is done via `dataProvider` method
- `unselectAll(): void`
	- will unselect all selected items
- event `selected-items-changed` will be fired on any selection change

#### Selector UI column

In addition to the selection APIs, `vwc-data-grid` provides an OOTB selector UI, column that:
- will auto render checkbox per row, this checkbox will add/remove corresponding item to/from selection
- will auto render checkbox header to perform select / deselect all
	- this checkbox will reflect the current selection state, being in indeterminate state when some of the items selected
	- 'select all' header won't be rendered when the selector column is said to work in `single` select mode
	- 'select all' header won't be renderer when the data provisioning method is via `dataProvider`

## Configuration / Customization / Management

Some of the grid's features are configured via __column/s configuration__, see below on that.
Others are related to the grid as a whole, we'll describe them first.

### Grid

Some of the properties of grid are also reflected via attributes.
All those cases explicitly mention the attribute name in the table below.
In those cases attribute and property may be used interchangeably.

| Property             | Attribute    | Type               | Default     | Description |
|----------------------|--------------|--------------------|-------------|------------|
| `multiSort`          | `multi-sort` | `boolean`          | `false`     | sorting by multiple columns |
| `reordering`         | `reordering` | `boolean`          | `false`     | columns reordering via UI (drag'n'drop') |
| `columns`            |              | `DataGridColumn[]` | `[]`        | columns definitions, the majority of grid configuration, see below more |
| `rowDetailsRenderer` |              | `DataRenderer`     | `undefined` | when provided, will handle an expanded / detailed row part rendering; see more details on `DataRenderer` below |
| `items`              |              | `unknown[]`        | `undefined` | see Data API above |
| `dataProvider`       |              | `(params: { page: number, pageSize: number }, callback: (pageItems: unknown[], treeLevelSize: number) => void): void` | `undefined` | see Data API above |
| `selectedItems`      |              | `unknown[]`        | `[]`        | see Data API above |

These are the methods available on grid component:

| Method                 | Signature               | Description |
|------------------------|-------------------------|-------------|
| `refreshConfiguration` | `(): void`              | refreshes configuration on demand, if needed; use when performing changes directly on the `columns` object (if the array reference remains the same) |
| `openItemDetails`      | `(item: unknown): void` | marks the row metadata as `expanded` and triggers `rowDetailsRenderer`, if available (see above) |
| `closeItemDetails`     | `(item: unknown): void` | unmarks the row as `expanded` and collapses the additional visual space provided for the details |
| `refreshData`          | `(): void`              | triggers visible data refresh; useful when undetectable data changes happen ('deep' changs in `items` or `dataProvider` internal logical conditions) |
| `selectItem`           | `(item: unknown, singleSelectMode: boolean = false): void` | selects a given item, adding it to the `selectedItems` array; when `singleSelectMode` is `true` all previously selected items will be unselected |
| `deselectItem`         | `(item: unknown): void` | unselects a given item |
| `selectAll`            | `(): void`              | select __all__ items; this method will __throw__ when the data provisioning is set to work with `dataProvider` |
| `deselectAll`          | `(): void`              | unselects __all__ selected items |

 ### `DataGridColumn`

Configuration of the grid **columns** is the major part of the whole grid setup.
There are 2 ways to configure grid's columns:
- via HTML elements bearing columns definitions
	- the configuration conveyed via `vwc-data-grid-column` component's properties / attributes
	- changes to the columns defitions back-reflected to the `columns` configuration object
	- add/remove columns is not supported
	- direct changes of the `columns` configuration object are NOT further-reflected in the configurational elements
- via configuration object manipulation by JavaScript and `columns` property of the grid component
	- direct Array manipulations on `columns` as well as deep changes to the `DataGridColumn` won't result in auto update of the grid, do `<grid>.refreshConfiguration()` (see API above)

> Note: both flavors adhere to the same configuration interface, namely `DataGridColumn` API (see below).

> Note: durting the initial bootstrapping of a grid instance declarative (`vwc-data-grid-column`) approach will take precedence over the `columns` object. Yet, furter changes to the latter and former in an unordered and random fashion may lead to unexpected configuration, which still being valid and fully functional might not reflect the desired state. As such it is better to stick to a chosen flavor along the way.

 `vwc-data-grid-column` component adheres to the `DataGridColumn` interface, therefore effectively there is a single API definition regardless of which configuration flavor used.

 | Property        | Attribute    | Type           | Default     | Description |
|------------------|--------------|----------------|-------------|------------|
| `path`           | `path`       | `string`       | `''`        | path into the item to get the data for this column's cells |
| `tree`           | `tree`       | `boolean`      | `false`     | makes column to behave as tree-able (open/close control, shifted value rendering etc) |
| `hidden`         | `hidden`     | `boolean`      | `false`     | show/hide column |
| `frozen`         | `frozen`     | `boolean`      | `false`     | freeze/unfreeze column (horizontal scroll pinning) |
| `sortable`       | `sortable`   | `boolean`      | `false`     | shows sorting UI and provides OOTB sorting support |
| `resizable`      | `resizable`  | `boolean`      | `false`     | controls column resizeability support (UI) |
| `selector`       | `selector`   | `string: 'single' | 'multi'` | `undefined` | column designated as `selector` will provide and OOTB header (checkbox) and cells (checkbox) to manage / reflect selection; see 'Selection API' above  |
| `autoWidth`      | `auto-width` | `boolean`      | `false`     | should the column to auto calculate and set it's own width (based on currently rendered content) |
| `width`          | `width`      | `string`       | `undefined` | sets static column width (width CSS value) |
| `header`         | `header`     | `string`       | `''`        | header label |
| `headerRenderer` |              | `MetaRenderer` | `undefined` | custom header rendering; see `MetaRenderer` details below |
| `footer`         | `footer`     | `string`       | `''`        | footer text |
| `footerRenderer` |              | `MetaRenderer` | `undefined` | custom footer rendering; see `MetaRenderer` details below |
| `cellRenderer`   |              | `DataRenderer` | `undefined` | custom cell rendering; see `DataRenderer` details below   |


### `MetaRenderer`

`MetaRenderer` is a __functional__ interface, defining the signature of the method to be used as renderer of meta elements like headers and footers.
Signature:
```js
(container: HTMLElement, configuration: RendererConfiguration): void
```

Each time grid component will require fresh render of the header/s and/or footer/s, it'll call the custom renderers, if provided.

> Attention: the renderer MAY and WILL be called several times for the same container, it is your responsibility to enforce idempotency of its logic.

> `MetaRenderer` API is used internally for sorting header and selector column's header. You may see the implementation details correspondingly.

### `DataRenderer`

`DataRenderer` is a __functional__ interface, defining the signature of the method to be used as renderer of cell contents.
Signature:
```js
(container: HTMLElement, configuration: RendererConfiguration, data: { item: unknown, selected: boolean }): void
```

Each time grid component will require fresh render of the cell/s content, it'll call the custom renderer, if provided.

> Attention: the renderer MAY and WILL be called several times for the same container, it is your responsibility to enforce idempotency of its logic.

> `DataRenderer` API is used internally for selector column's cells. You may see the implementation details there.

## Examples

Few examples of grid definition in several flavors.
All of them employ `LitHtml` binding notation, which of course can be replaced by any other data-centric framework.

> Note: the dot (`.`) leaded notaion reads 'assign the said object to the said property **by reference**'. For the sake of simplicity we'll assume that all of th top level objects are accessible from the current templating scope.

### JavaScript oriented

```html
<vwc-data-grid
	.columns="${columns}"
	.items="${items}"
	.rowDetailsRenderer="${expandedRowRenderer}">
</vwc-data-grid>
```

Now the JavaScript part, assuming running in the same scope as the template above:
```js
const columns = [
	{ header: 'First Name', path: 'fname' },
	{ header: 'Last Name', path: 'lname', sortable: true },
	{ header: 'Expand Row', autoWidth: true, cellRenderer: cellRenderer }
];
const data = [
	{ fname: 'Max', lname: 'Weber' },
	...
];
const cellRenderer = (container, column, data) {
	container.innerHTML = ...
};
```

In order to customize columns at runtime use the following pattern:
```js
const grid = document.querySelector('vwc-data-grid');
grid.columns[0].frozen = true;
grid.refreshConfiguration();
```

> Attention: the `refreshConfiguration` invokation is required as of now, due to internals of `columns` data structure not being observed for a change. In any change of this in the future further notice will be provided.

### HTML oriented

```html
<vwc-data-grid .items="${items}" .rowDetailsRenderer="${expandedRowRenderer}">
	<vwc-data-grid-column header="First Name" path="fname"></vwc-data-grid-column>
	<vwc-data-grid-column header="Last Name" path="lname" sortable></vwc-data-grid-column>
	<vwc-data-grid-column header="Expand Row" auto-width .cellRenderer="${cellRenderer}"></vwc-data-grid-column>
</vwc-data-grid>
```

Now the JavaScript part, assuming running in the same scope as the template above:
```js
const data = [
	{ fname: 'Max', lname: 'Weber' },
	...
];
const cellRenderer = (container, column, data) {
	container.innerHTML = ...
};
```

Pay attention, how the columns data structure is not maintained in JS anymore.
Moreover, attributes like `sortable`, `auto-width` etc can be binded to some data structure managed be data-binding framework, thus removing the whole customization part out of scripting scope.