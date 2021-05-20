# `expansion panel`

#### `should have internal contents`

```html
<div class="expansion-panel">
  <div class="expansion-panel-header">
    <mwc-ripple>
    </mwc-ripple>
    <span class="leading-icon">
      <slot name="icon">
        <vwc-icon
          class="toggle-open vvd-icon"
          type="plus-solid"
        >
        </vwc-icon>
        <vwc-icon
          class="toggle-close vvd-icon"
          type="minus-solid"
        >
        </vwc-icon>
      </slot>
    </span>
    click me
    <span class="trailing-icon">
      <slot name="trailingIcon">
      </slot>
    </span>
  </div>
  <div class="expansion-panel-body">
    <slot>
    </slot>
  </div>
</div>

```

