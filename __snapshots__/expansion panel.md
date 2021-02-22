# `expansion panel`

#### `should have internal contents`

```html
<div class="expansion-panel">
  <div class="expansion-panel-header">
    <span class="leading-icon">
      <slot name="icon">
        <vwc-icon
          class="toggle-open vvd-icon"
          size="medium"
          type="plus-solid"
        >
        </vwc-icon>
        <vwc-icon
          class="toggle-close vvd-icon"
          size="medium"
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

