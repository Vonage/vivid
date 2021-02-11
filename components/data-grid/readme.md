# vwc-data-grid

`vwc-data-grid` Data Grid component, based on The Best JavaScript Grid in the World [Ag-Grid.com][1].

## Documentation

Full comprehensive documentation on Grid API including any possible configuration scenarios is available [here][2]

## Structure

`vwc-data-grid` is a main **required** component.

`vwc-data-grid-column` is an **optional** non visual element used to define data grid columns configuration in a declarative manner.


## API

To begin with, any light DOM within the `vwc-data-grid` is slotted to become a data grid **declarative** configuration. For example child `vwc-data-grid-column` tags would be treated as columns configuration.

Additionally, `vwc-data-grid` element reflects all the Ag-Grid native APIs *for the full list of them please consult with the Ag-grid documentation* [here][3] when reading the docs please treat `ag-grid-polymer` parts as `vwc-data-grid` and you are there.

## Basic usage

```js
import '@vonage/vwc-data-grid';
import { html } from 'lit-element';

    const options = {
        columnDefs: [
            { headerName: "Maker", field: "maker", sortable: true },
            { headerName: "Model", field: "model" },
            { headerName: "Price", field: "price", sortable: true, filter: "agNumberColumnFilter" }
        ],
        rowData: [
            { "maker": "Toyota", "model": "Celica", "price": 35000 },
            { "maker": "Ford", "model": "Mondeo", "price": 32000 },
            { "maker": "Porsche", "model": "Boxter", "price": 72000 },
        ]
    }

    html`
<div style='width: 600px; height: 300px'>
    <vwc-data-grid .options=${options}>
    </vwc-data-grid>
</div>
`
```

## Licensing

Original Ag-grid component has several licensing [options][4].
`vwc-data-grid` element uses *only* "Community" edition - is a free to use product distributed under the MIT License. It is **free** to use in your **production** environments.

i.e. No "Enterprise" features will be accessible at this very moment. 


[1]: http://ag-grid.com
[2]: https://www.ag-grid.com/documentation/javascript/
[3]: https://www.ag-grid.com/documentation/javascript/grid-interface/#properties-on-ag-grid-polymer
[4]: https://www.ag-grid.com/license-pricing.php