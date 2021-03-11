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

In case of collision between those 2 (both set to something contentful), error will be printed to the console and `dataProvider` will take precedence.

### `items`

Each new assignment to grid's items property will refresh the grid's content.

Array manipulation (eg `grid.items.splice(0, 1)`) **wont't** trigger grid update. In such cases the best way to trigger the update is by reassigning **new** array:
```js
grid.items = oldItems.slice(0);			// even being the same items, the array is new by ref, so will trigger the update
```

### `dataProvider`

Grid will call `dataProvider` each time new chunk of data needed.
First argument will hold an needed chunk params, page number, page size etc.
Second argumet is the grid's own callback to be called with the fetched / prepared data.

## Configuration / Customization

Most of the grid's features are configured **column/s configuration** and only few are related to the grid as a whole, data manipulation APIs described above being part of them.

### Grid

Some of the properties of grid are also reflected via attributes.
All those cases explicitly mention the attribute name in the table below.
In those cases attribute and property may be used interchangeably.

| Property             | Attribute    | Type                             | Default     | Description |
|----------------------|--------------|----------------------------------|-------------|------------|
| `multiSort`          | `multi-sort` | `boolean`                        | `false`     | sorting by multiple columns |
| `reordering`         | `reordering` | `boolean`                        | `false`     | columns reordering via UI (drag'n'drop') |
| `columns`            |              | `DataGridColumn[]`               | `[]`        | columns definitions, the majority of grid configuration, see below more |
| `rowDetailsRenderer` |              | `(container: HTMLElement, grid: DataGrid, data: { item: unknown }): void` | `undefined` | when provided, will handle an expanded / detailed row part rendering |
| `items`              |              | `unknown[]`                      | `undefined` | see Data API above |
| `dataProvider`       |              | `(params: { page: number, pageSize: number }, callback: (pageItems: unknown[], treeLevelSize: number) => void): void` | `undefined` | see Data API above |

Configuration of the grid **columns** is the major part of the whole grid setup.
There are 2 ways to configure grid's columns:
- via HTML elements bearing columns definitions
	- the configuration conveyed via `vwc-data-grid-column` component's properties / attributes
	- changes to the columns defitions back-reflected to the `columns` configuration object
	- add/remove columns in the flavor is not supported
	- direct changes of the `columns` configuration object are NOT further-reflected in the components
- via configuration object manipulation by JavaScript and `columns` property of the grid component
	- direct Array manipulations on `columns` as well as deep changes to the `DataGridColumn` won't result in auto update of the grid, do `<grid>.refreshConfiguration()`

> Note: both flavors adhere to the same configuration interface, namely `DataGridColumn` API (see below).

> Note: durting the initial bootstrapping of a grid instance declarative (`vwc-data-grid-column`) approach will take precedence over the `columns` object. Yet, furter changes to the latter and former in an unordered and random fashion may lead to unexpected configuration, which still being valid and fully functional might not reflect the desired state. As such it is better to stick to a chosen flavor along the way.

 #### `DataGridColumn`

 `vwc-data-grid-column` component adheres to the `DataGridColumn` interface, therefore effectively there is a single API definition regardless of which configuration flavor used.

 | Property        | Attribute    | Type                             | Default     | Description |
|------------------|--------------|----------------------------------|-------------|------------|
| `path`           | `path`       | `string`                         | `''`        | path into the item to get the data for this column's cells |
| `header`         | `header`     | `string`                         | `''`        | header label |
| `hidden`         | `hidden`     | `boolean`                        | `false`     | show/hide column |
| `frozen`         | `frozen`     | `boolean`                        | `false`     | freeze/unfreeze column (horizontal scroll pinning) |
| `sortable`       | `sortable`   | `boolean`                        | `false`     | shows sorting UI and provides OOTB sorting support |
| `resizable`      | `resizable`  | `boolean`                        | `false`     | controls column resizeability support (UI) |
| `autoWidth`      | `auto-width` | `boolean`                        | `false`     | should the column to auto calculate and set it's own width (based on currently rendered content) |
| `width`          | `width`      | `string`                         | `undefined` | sets static column width (width CSS value) |
| `tree`           | `tree`       | `boolean`                        | `false`     | makes column to behave as tree-able (open/close control, shifted value rendering etc) |
| `cellRenderer`   |              | `(container: HTMLElement, column: DataGridColumn, data: { item: unknown, detailsOpened: boolean }): void` | `undefined` | custom cell rendering   |
| `headerRenderer` |              | `(container: HTMLElement): void` | `undefined` | custom header rendering |
| `footerRenderer` |              | `(container: HTMLElement): void` | `undefined` | custom footer rendering |

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