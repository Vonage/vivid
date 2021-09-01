# `icon button toggle`

#### `should have internal contents`

```html
<button
  aria-pressed="false"
  class="mdc-icon-button"
>
  <span class="mdc-icon-button__icon">
    <slot name="offIcon">
    </slot>
  </span>
  <span class="mdc-icon-button__icon mdc-icon-button__icon--on">
    <slot name="onIcon">
    </slot>
  </span>
</button>

```

