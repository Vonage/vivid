# `textfield`

#### `should have internal contents`

```html
<input
  class="vivid-input-internal"
  placeholder=" "
  slot="formInputElement"
  type="text"
  value=""
>

```

```html
<label class="mdc-text-field mdc-text-field--no-label mdc-text-field--outlined">
  <vwc-notched-outline class="mdc-notched-outline vvd-notch">
  </vwc-notched-outline>
  <div class="mdc-text-field__input">
  </div>
  <slot name="formInputElement">
  </slot>
  <slot name="action">
  </slot>
</label>

```

