# `pagination layout`

#### `has correct pages layout for total of 0 (selected index 0)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 1 (selected index 0)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
      selected=""
    >
      1
    </span>
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 2 (selected index 0)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
      selected=""
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 3 (selected index 0)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
      selected=""
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 4 (selected index 0)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
      selected=""
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
    >
      4
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 5 (selected index 0)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
      selected=""
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
    >
      5
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 0 (selected index -1)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 2 (selected index 1)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
      selected=""
    >
      2
    </span>
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 3 (selected index 2)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
      selected=""
    >
      3
    </span>
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 4 (selected index 3)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
      selected=""
    >
      4
    </span>
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 5 (selected index 4)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
      selected=""
    >
      5
    </span>
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 0)`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
      selected=""
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
    >
      4
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="8"
    >
      9
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 1)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
      selected=""
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
    >
      4
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="8"
    >
      9
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 2)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
      selected=""
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
    >
      5
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 3)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
      selected=""
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
    >
      5
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 4)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="3"
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
      selected=""
    >
      5
    </span>
    <span
      class="item page"
      data-index="5"
    >
      6
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 5)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="4"
    >
      5
    </span>
    <span
      class="item page"
      data-index="5"
      selected=""
    >
      6
    </span>
    <span
      class="item page"
      data-index="6"
    >
      7
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 6)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="5"
    >
      6
    </span>
    <span
      class="item page"
      data-index="6"
      selected=""
    >
      7
    </span>
    <span
      class="item page"
      data-index="7"
    >
      8
    </span>
    <span
      class="item page"
      data-index="8"
    >
      9
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 7)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="5"
    >
      6
    </span>
    <span
      class="item page"
      data-index="6"
    >
      7
    </span>
    <span
      class="item page"
      data-index="7"
      selected=""
    >
      8
    </span>
    <span
      class="item page"
      data-index="8"
    >
      9
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 8)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="6"
    >
      7
    </span>
    <span
      class="item page"
      data-index="7"
    >
      8
    </span>
    <span
      class="item page"
      data-index="8"
      selected=""
    >
      9
    </span>
    <span
      class="item page"
      data-index="9"
    >
      10
    </span>
  </div>
  <span class="item next">
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index 9)`

```html
<div class="all container">
  <span class="item prev">
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
    >
      2
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="6"
    >
      7
    </span>
    <span
      class="item page"
      data-index="7"
    >
      8
    </span>
    <span
      class="item page"
      data-index="8"
    >
      9
    </span>
    <span
      class="item page"
      data-index="9"
      selected=""
    >
      10
    </span>
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>

```

#### `has correct pages layout for total of 10 (selected index -1)`

```html
<div class="all container">
  <span
    class="item prev"
    tabindex="0"
  >
    <slot name="prev-control">
      <vwc-icon
        size="small"
        type="chevron-left-line"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="container pages">
    <span
      class="item page"
      data-index="0"
      selected=""
      tabindex="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
      tabindex="0"
    >
      2
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="9"
      tabindex="0"
    >
      10
    </span>
  </div>
  <span
    class="item next"
    tabindex="0"
  >
    <slot name="next-control">
      <vwc-icon
        size="small"
        type="chevron-right-line"
      >
      </vwc-icon>
    </slot>
  </span>
</div>
```

