# `expansion panel`

#### `should have internal contents`

```html
<button
  aria-controls="content"
  class="expansion-panel-header"
  id="expansion-panel"
>
  <mwc-ripple>
  </mwc-ripple>
  <span class="leading-icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="header-text">
    click me
  </span>
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
  aria-labelledby="expansion-panel"
  class="expansion-panel-body"
  id="content"
  role="region"
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
  id="expansion-panel"
>
  <mwc-ripple>
  </mwc-ripple>
  <span class="leading-icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="header-text">
    click me
  </span>
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
  aria-labelledby="expansion-panel"
  class="expansion-panel-body"
  id="content"
  role="region"
>
  <slot>
  </slot>
</div>

```

