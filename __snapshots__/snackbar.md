# `snackbar`

#### `should have internal contents - flavor = ''`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div
      class="modern-flavor"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (header) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div
      class="modern-flavor"
      part="vvd-scheme-alternate"
    >
      <vwc-note header="Header">
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (message) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div
      class="modern-flavor"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
        <div class="snackbar-content">
          <div>
            Message
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (icon) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div
      class="modern-flavor"
      part="vvd-scheme-alternate"
    >
      <vwc-note icon="home">
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (dismissible) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div
      class="modern-flavor"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
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
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (slotted action) - flavor = ''`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div
      class="modern-flavor"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>

```

#### `should have internal contents - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="legacy-flavor">
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (header) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="legacy-flavor">
      <vwc-note header="Header">
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (message) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="legacy-flavor">
      <vwc-note>
        <div class="snackbar-content">
          <div>
            Message
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (icon) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="legacy-flavor">
      <vwc-note icon="home">
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (dismissible) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="legacy-flavor">
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
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
      </vwc-note>
    </div>
  </div>
</div>
```

#### `should have internal contents (slotted action) - flavor = 'legacy'`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div class="legacy-flavor">
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
          <div class="dismiss-container">
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>

```

