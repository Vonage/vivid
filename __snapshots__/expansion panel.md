# `expansion panel`

#### `should have internal contents`

```html
<button
  aria-controls="content"
  class="expansion-panel-header"
>
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
</button>
<div
  class="expansion-panel-body"
  id="content"
>
  <slot>
  </slot>
</div>

```

#### `should have internal contents (deprecated 'header')`

```html
<button
  aria-controls="content"
  class="expansion-panel-header"
>
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
</button>
<div
  class="expansion-panel-body"
  id="content"
>
  <slot>
  </slot>
</div>

```

