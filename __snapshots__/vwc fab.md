# `vwc fab`

#### `vwc-fab has internal contents (no icon)`

```html
<button
  aria-label=""
  class="mdc-fab"
>
  <span class="icon-slot-container">
    <slot name="icon">
    </slot>
  </span>
</button>

```

#### `vwc-fab has internal contents (with icon)`

```html
<button
  aria-label="info"
  class="mdc-fab"
>
  <span class="icon-slot-container">
    <slot name="icon">
      <vwc-icon
        class="vvd-icon"
        size="medium"
        type="info"
      >
      </vwc-icon>
    </slot>
  </span>
</button>

```

#### `vwc-fab has internal contents (with icon, mini size)`

```html
<button
  aria-label="info"
  class="mdc-fab mdc-fab--mini mdc-fab--touch"
>
  <span class="icon-slot-container">
    <slot name="icon">
      <vwc-icon
        class="vvd-icon"
        size="small"
        type="info"
      >
      </vwc-icon>
    </slot>
  </span>
  <div class="mdc-fab__touch">
  </div>
</button>

```

