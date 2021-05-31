# `snackbar`

#### `should have internal contents - flavor = ''`

```html
<div
  class="mdc-snackbar"
  position="BOTTOM-CENTER"
>
  <div class="mdc-snackbar__surface">
    <div
      class="vivid-snackbar"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
      </vwc-note>
      <div class="actions-container">
        <div class="action-container">
          <slot name="action">
          </slot>
        </div>
      </div>
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
      class="vivid-snackbar"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
      </vwc-note>
      <div class="actions-container">
        <div class="action-container">
          <slot name="action">
          </slot>
        </div>
      </div>
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
      class="vivid-snackbar"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
        Message
      </vwc-note>
      <div class="actions-container">
        <div class="action-container">
          <slot name="action">
          </slot>
        </div>
      </div>
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
      class="vivid-snackbar"
      part="vvd-scheme-alternate"
    >
      <vwc-note icon="home">
      </vwc-note>
      <div class="actions-container">
        <div class="action-container">
          <slot name="action">
          </slot>
        </div>
      </div>
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
      class="vivid-snackbar"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
      </vwc-note>
      <div class="actions-container">
        <div class="action-container">
          <slot name="action">
          </slot>
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
      class="vivid-snackbar"
      part="vvd-scheme-alternate"
    >
      <vwc-note>
      </vwc-note>
      <div class="actions-container">
        <div class="action-container">
          <slot name="action">
          </slot>
        </div>
      </div>
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
    <div class="vivid-snackbar">
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
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
    <div class="vivid-snackbar">
      <vwc-note header="Header">
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
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
    <div class="vivid-snackbar">
      <vwc-note>
        <div class="snackbar-content">
          <div>
            Message
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
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
    <div class="vivid-snackbar">
      <vwc-note icon="home">
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
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
    <div class="vivid-snackbar">
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
    <div class="vivid-snackbar">
      <vwc-note>
        <div class="snackbar-content">
          <div>
            <div class="action-container">
              <slot name="action">
              </slot>
            </div>
          </div>
        </div>
      </vwc-note>
    </div>
  </div>
</div>

```

