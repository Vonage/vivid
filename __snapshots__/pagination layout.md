# `pagination layout`

#### `has correct pages layout for total of 0 (selected index 0)`

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

#### `has correct pages layout for total of 1 (selected index 0)`

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

#### `has correct pages layout for total of 2 (selected index 0)`

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

#### `has correct pages layout for total of 3 (selected index 0)`

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
    <span
      class="item page"
      data-index="2"
      tabindex="0"
    >
      3
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

#### `has correct pages layout for total of 4 (selected index 0)`

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
    <span
      class="item page"
      data-index="2"
      tabindex="0"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
      tabindex="0"
    >
      4
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

#### `has correct pages layout for total of 5 (selected index 0)`

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
      data-index="4"
      tabindex="0"
    >
      5
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

#### `has correct pages layout for total of 0 (selected index -1)`

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

#### `has correct pages layout for total of 2 (selected index 1)`

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
      tabindex="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
      selected=""
      tabindex="0"
    >
      2
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

#### `has correct pages layout for total of 3 (selected index 2)`

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
    <span
      class="item page"
      data-index="2"
      selected=""
      tabindex="0"
    >
      3
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

#### `has correct pages layout for total of 4 (selected index 3)`

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
    <span
      class="item page"
      data-index="2"
      tabindex="0"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
      selected=""
      tabindex="0"
    >
      4
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

#### `has correct pages layout for total of 5 (selected index 4)`

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
      tabindex="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="3"
      tabindex="0"
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
      selected=""
      tabindex="0"
    >
      5
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

#### `has correct pages layout for total of 10 (selected index 0)`

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

#### `has correct pages layout for total of 10 (selected index 1)`

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
      tabindex="0"
    >
      1
    </span>
    <span
      class="item page"
      data-index="1"
      selected=""
      tabindex="0"
    >
      2
    </span>
    <span
      class="item page"
      data-index="2"
      tabindex="0"
    >
      3
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

#### `has correct pages layout for total of 10 (selected index 2)`

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
    <span
      class="item page"
      data-index="2"
      selected=""
      tabindex="0"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
      tabindex="0"
    >
      4
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

#### `has correct pages layout for total of 10 (selected index 3)`

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
    <span
      class="item page"
      data-index="2"
      tabindex="0"
    >
      3
    </span>
    <span
      class="item page"
      data-index="3"
      selected=""
      tabindex="0"
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
      tabindex="0"
    >
      5
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

#### `has correct pages layout for total of 10 (selected index 4)`

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
      tabindex="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="3"
      tabindex="0"
    >
      4
    </span>
    <span
      class="item page"
      data-index="4"
      selected=""
      tabindex="0"
    >
      5
    </span>
    <span
      class="item page"
      data-index="5"
      tabindex="0"
    >
      6
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

#### `has correct pages layout for total of 10 (selected index 5)`

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
      tabindex="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="4"
      tabindex="0"
    >
      5
    </span>
    <span
      class="item page"
      data-index="5"
      selected=""
      tabindex="0"
    >
      6
    </span>
    <span
      class="item page"
      data-index="6"
      tabindex="0"
    >
      7
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

#### `has correct pages layout for total of 10 (selected index 6)`

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
      tabindex="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="5"
      tabindex="0"
    >
      6
    </span>
    <span
      class="item page"
      data-index="6"
      selected=""
      tabindex="0"
    >
      7
    </span>
    <span
      class="item page"
      data-index="7"
      tabindex="0"
    >
      8
    </span>
    <span
      class="item page"
      data-index="8"
      tabindex="0"
    >
      9
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

#### `has correct pages layout for total of 10 (selected index 7)`

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
      tabindex="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="6"
      tabindex="0"
    >
      7
    </span>
    <span
      class="item page"
      data-index="7"
      selected=""
      tabindex="0"
    >
      8
    </span>
    <span
      class="item page"
      data-index="8"
      tabindex="0"
    >
      9
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

#### `has correct pages layout for total of 10 (selected index 8)`

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
      tabindex="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="7"
      tabindex="0"
    >
      8
    </span>
    <span
      class="item page"
      data-index="8"
      selected=""
      tabindex="0"
    >
      9
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

#### `has correct pages layout for total of 10 (selected index 9)`

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
      tabindex="0"
    >
      1
    </span>
    <span class="ellipsis item">
      ...
    </span>
    <span
      class="item page"
      data-index="8"
      tabindex="0"
    >
      9
    </span>
    <span
      class="item page"
      data-index="9"
      selected=""
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

