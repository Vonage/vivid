# `data grid selection UI`

#### `should render selector column with header (multi select)`

```html
<vaadin-grid
  class="vvd-grid-engine-root"
  style="touch-action: none;"
  theme="no-border"
>
  <dom-module
    id="my-grid-styles"
    theme-for="vaadin-grid"
  >
    <template>
    </template>
  </dom-module>
  <vaadin-grid-column
    flex-grow="0"
    width="56px"
  >
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-checkbox class="vvd-all-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-10">
    <vwc-data-grid-header path="y">
      B
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-11">
    <vwc-data-grid-header path="z">
      C
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-12">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-13">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-14">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-15">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-16">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-17">
  </vaadin-grid-cell-content>
</vaadin-grid>

```

#### `should not render selector header when single mode`

```html
<vaadin-grid
  class="vvd-grid-engine-root"
  style="touch-action: none;"
  theme="no-border"
>
  <dom-module
    id="my-grid-styles"
    theme-for="vaadin-grid"
  >
    <template>
    </template>
  </dom-module>
  <vaadin-grid-column
    flex-grow="0"
    width="56px"
  >
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-10">
    <vwc-data-grid-header path="y">
      B
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-11">
    <vwc-data-grid-header path="z">
      C
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-12">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-13">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-14">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-15">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-16">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-17">
  </vaadin-grid-cell-content>
</vaadin-grid>

```

#### `should not render selector header when dataProvider used (even if multi mode)`

```html
<vaadin-grid
  class="vvd-grid-engine-root"
  style="touch-action: none;"
  theme="no-border"
>
  <dom-module
    id="my-grid-styles"
    theme-for="vaadin-grid"
  >
    <template>
    </template>
  </dom-module>
  <vaadin-grid-column
    flex-grow="0"
    width="56px"
  >
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-10">
    <vwc-data-grid-header path="y">
      B
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-11">
    <vwc-data-grid-header path="z">
      C
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-12">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-13">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-14">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-15">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-16">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-17">
  </vaadin-grid-cell-content>
</vaadin-grid>

```

#### `should hide header when switching from multi to single (items data provider)`

```html
<vaadin-grid
  class="vvd-grid-engine-root"
  style="touch-action: none;"
  theme="no-border"
>
  <dom-module
    id="my-grid-styles"
    theme-for="vaadin-grid"
  >
    <template>
    </template>
  </dom-module>
  <vaadin-grid-column
    flex-grow="0"
    width="56px"
  >
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    <vwc-checkbox class="vvd-row-selector">
    </vwc-checkbox>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-10">
    <vwc-data-grid-header path="y">
      B
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-11">
    <vwc-data-grid-header path="z">
      C
    </vwc-data-grid-header>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-12">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-13">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-14">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-15">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-16">
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-17">
  </vaadin-grid-cell-content>
</vaadin-grid>

```

