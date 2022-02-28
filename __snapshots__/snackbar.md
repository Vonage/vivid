# `snackbar`

#### `should have internal contents - flavor = ''`

```html
<div
  class="mdc-snackbar"
  part="vvd-scheme-alternate"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
    </div>
    <div class="mdc-snackbar__actions">
      <slot name="action">
      </slot>
    </div>
  </div>
</div>

```

#### `should have internal contents (header) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  part="vvd-scheme-alternate"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
      <h3
        aria-hidden="true"
        class="heading"
      >
        Header
      </h3>
    </div>
    <div class="mdc-snackbar__actions">
      <slot name="action">
      </slot>
    </div>
  </div>
</div>

```

#### `should have internal contents (message) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  part="vvd-scheme-alternate"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
    </div>
    <div class="mdc-snackbar__actions">
      <slot name="action">
      </slot>
    </div>
  </div>
</div>

```

#### `should have internal contents (icon) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  part="vvd-scheme-alternate"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <vwc-icon
      class="icon"
      type="home"
    >
    </vwc-icon>
    <div class="header-and-label">
    </div>
    <div class="mdc-snackbar__actions">
      <slot name="action">
      </slot>
    </div>
  </div>
</div>

```

#### `should have internal contents (dismissible) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  part="vvd-scheme-alternate"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
    </div>
    <div class="mdc-snackbar__actions">
      <slot name="action">
      </slot>
      <div class="dismiss-container">
        <vwc-icon-button
          class="dismiss-button"
          dense=""
          icon="close-line"
          layout="ghost"
        >
        </vwc-icon-button>
      </div>
    </div>
  </div>
</div>

```

#### `should have internal contents (slotted action) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  part="vvd-scheme-alternate"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
    </div>
    <div class="mdc-snackbar__actions">
      <slot name="action">
      </slot>
    </div>
  </div>
</div>

```

#### `should have internal contents - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar vwc-snackbar-legacy"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
      <slot name="action">
      </slot>
    </div>
    <div class="mdc-snackbar__actions">
    </div>
  </div>
</div>
```

#### `should have internal contents (header) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar vwc-snackbar-legacy"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
      <h3
        aria-hidden="true"
        class="heading"
      >
        Header
      </h3>
      <slot name="action">
      </slot>
    </div>
    <div class="mdc-snackbar__actions">
    </div>
  </div>
</div>
```

#### `should have internal contents (message) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar vwc-snackbar-legacy"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
      <slot name="action">
      </slot>
    </div>
    <div class="mdc-snackbar__actions">
    </div>
  </div>
</div>
```

#### `should have internal contents (icon) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar vwc-snackbar-legacy"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <vwc-icon
      class="icon"
      type="home"
    >
    </vwc-icon>
    <div class="header-and-label">
      <slot name="action">
      </slot>
    </div>
    <div class="mdc-snackbar__actions">
    </div>
  </div>
</div>
```

#### `should have internal contents (dismissible) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar vwc-snackbar-legacy"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
      <slot name="action">
      </slot>
    </div>
    <div class="mdc-snackbar__actions">
      <div class="dismiss-container">
        <vwc-icon-button
          class="dismiss-button"
          dense=""
          icon="close-line"
          layout="ghost"
        >
        </vwc-icon-button>
      </div>
    </div>
  </div>
</div>
```

#### `should have internal contents (slotted action) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar vwc-snackbar-legacy"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="header-and-label">
      <slot name="action">
      </slot>
    </div>
    <div class="mdc-snackbar__actions">
    </div>
  </div>
</div>
```

