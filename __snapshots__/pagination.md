# `pagination`

#### `should have internal contents`

```html
<div class="all container">
  <span
    class="item prev"
    disabled=""
  >
    <slot name="prev-control">
      <span class="control">
        <mwc-ripple class="ripple">
        </mwc-ripple>
        <vwc-icon
          class="icon"
          size="small"
          type="chevron-left-line"
        >
        </vwc-icon>
      </span>
    </slot>
  </span>
  <div class="container pages">
  </div>
  <span
    class="item next"
    disabled=""
  >
    <slot name="next-control">
      <span class="control">
        <mwc-ripple class="ripple">
        </mwc-ripple>
        <vwc-icon
          class="icon"
          size="small"
          type="chevron-right-line"
        >
        </vwc-icon>
      </span>
    </slot>
  </span>
</div>

```

