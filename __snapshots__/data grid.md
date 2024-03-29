# `data grid`

#### `should reflect/react on reordering property`

```html
<dom-module
  id="my-grid-styles"
  theme-for="vaadin-grid"
>
  <template>
  </template>
</dom-module>
<vaadin-grid
  class="vvd-grid-engine-root"
  column-reordering-allowed=""
  style="touch-action: none;"
  theme="no-border"
>
</vaadin-grid>

```

#### `should reflect columns redefinition on refreshConfiguration (sortable, resizable)`

```html
<dom-module
  id="my-grid-styles"
  theme-for="vaadin-grid"
>
  <template>
  </template>
</dom-module>
<vaadin-grid
  class="vvd-grid-engine-root"
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-data-grid-header path="x">
      A
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <vwc-data-grid-header
      path="y"
      sortable=""
    >
      B
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    <vwc-data-grid-header path="z">
      C
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
  </vaadin-grid-cell-content>
</vaadin-grid>

```

```html
<dom-module
  id="my-grid-styles"
  theme-for="vaadin-grid"
>
  <template>
  </template>
</dom-module>
<vaadin-grid
  class="vvd-grid-engine-root"
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-data-grid-header path="x">
      A
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <vwc-data-grid-header
      path="y"
      sortable=""
    >
      B
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    <vwc-data-grid-header path="z">
      C
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
  </vaadin-grid-cell-content>
</vaadin-grid>

```

```html
<dom-module
  id="my-grid-styles"
  theme-for="vaadin-grid"
>
  <template>
  </template>
</dom-module>
<vaadin-grid
  class="vvd-grid-engine-root"
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column
    path="z"
    resizable=""
  >
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-data-grid-header path="x">
      A
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <vwc-data-grid-header path="y">
      B
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    <vwc-data-grid-header path="z">
      C
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
  </vaadin-grid-cell-content>
</vaadin-grid>

```

