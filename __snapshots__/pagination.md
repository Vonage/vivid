# `pagination`

#### `should have internal contents`

```html
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
  data-index="9"
  tabindex="0"
>
  10
</span>
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

```

