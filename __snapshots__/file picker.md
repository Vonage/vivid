# `file picker`

#### `should have the expected internal contents`

```html
<label>
  <vwc-button
    class="vwc-upload-button"
    connotation="primary"
    icon="upload"
    layout="filled"
    shape="rounded"
    trailingicon=""
    type="submit"
    unelevated=""
  >
    <slot>
    </slot>
    Add file
    <button
      style="display: none;"
      type="submit"
    >
    </button>
  </vwc-button>
  <slot name="internal-input">
  </slot>
</label>

```

