# `expansion panel`

#### `should have internal contents`

```html
<div class="expansion-panel">
  <div class="expansion-panel-header">
    <mwc-ripple>
    </mwc-ripple>
    <span class="leading-icon">
      <slot name="icon">
      </slot>
    </span>
    click me
    <span class="trailing-icon">
      <slot name="trailingIcon">
        <vwc-icon
          class="toggle-open"
          type="chevron-down-solid"
        >
        </vwc-icon>
        <vwc-icon
          class="toggle-close"
          type="chevron-up-solid"
        >
        </vwc-icon>
      </slot>
    </span>
  </div>
  <div class="expansion-panel-body">
    <slot>
    </slot>
  </div>
</div>

```

