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

Array manipulation (eg `grid.items.splice(0, 1)`) **wont't** trigger grid update.

### `dataProvider`

Grid will call `dataProvider` each time new chunk of data needed.
First argument will hold an needed chunk params, page number, page size etc.
Second argumet is the grid's own callback to be called with the fetched / prepared data.

## Configuration / Customization

