# `Dialog`

#### `should have internal contents matching snapshot`

```html
<div
  aria-describedby="content"
  aria-labelledby="title"
  aria-modal="true"
  class="mdc-dialog mdc-dialog--open"
  role="alertdialog"
>
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface">
      <div
        class="mdc-dialog__content"
        id="content"
      >
        <slot id="contentSlot">
        </slot>
      </div>
      <footer
        class="mdc-dialog__actions"
        id="actions"
      >
        <span>
          <slot name="secondaryAction">
          </slot>
        </span>
        <span>
          <slot name="primaryAction">
          </slot>
        </span>
      </footer>
    </div>
  </div>
  <div class="mdc-dialog__scrim">
  </div>
</div>

```

