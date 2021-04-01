# `data grid renderers customization`

#### `should render header text by default`

```html
<vaadin-grid
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-data-grid-header path="x">
      A
    </vwc-data-grid-header>
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

#### `should render footer text by default`

```html
<vaadin-grid
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-data-grid-header path="x">
      A
    </vwc-data-grid-header>
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
  <vaadin-grid-cell-content
    class="vvd-grid-footer"
    slot="vaadin-grid-cell-content-12"
  >
    Footer text
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

#### `should render custom header when renderer provided`

```html
<vaadin-grid
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <span class="custom">
      A
    </span>
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

#### `should render custom footer when renderer provided`

```html
<vaadin-grid
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-data-grid-header path="x">
      A
    </vwc-data-grid-header>
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
    <span class="custom">
      Total: 3
    </span>
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

#### `should render custom cell when renderer provided`

```html
<vaadin-grid
  style="touch-action: none;"
  theme="no-border"
>
  <vaadin-grid-column path="x">
  </vaadin-grid-column>
  <vaadin-grid-column path="y">
  </vaadin-grid-column>
  <vaadin-grid-column path="z">
  </vaadin-grid-column>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-1">
    <span class="custom">
      {"index":0,"item":{"x":0,"y":"text 0","z":true},"level":0,"expanded":false,"selected":false,"detailsOpened":false}
    </span>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-2">
    text 0
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-3">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-4">
    <span class="custom">
      {"index":1,"item":{"x":1,"y":"text 1","z":true},"level":0,"expanded":false,"selected":false,"detailsOpened":false}
    </span>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-5">
    text 1
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-6">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-7">
    <span class="custom">
      {"index":2,"item":{"x":2,"y":"text 2","z":true},"level":0,"expanded":false,"selected":false,"detailsOpened":false}
    </span>
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-8">
    text 2
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-9">
    true
  </vaadin-grid-cell-content>
  <vaadin-grid-cell-content slot="vaadin-grid-cell-content-0">
    <vwc-data-grid-header path="x">
      A
    </vwc-data-grid-header>
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

