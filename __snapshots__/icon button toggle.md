# `icon button toggle`

#### `should internal contents`

```html
<button
  aria-pressed="false"
  class="mdc-icon-button"
>
  <span class="mdc-icon-button__icon">
    <slot name="offIcon">
      <vwc-icon type="">
      </vwc-icon>
    </slot>
  </span>
  <span class="mdc-icon-button__icon mdc-icon-button__icon--on">
    <slot name="onIcon">
      <vwc-icon type="">
      </vwc-icon>
    </slot>
  </span>
</button>

```

