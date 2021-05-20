# `Dialog`

#### `should internal contents`

```html
<div
  aria-describedby="content"
  aria-labelledby="title"
  aria-modal="true"
  class="mdc-dialog"
  role="alertdialog"
>
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface">
      <div id="dialog_icon">
        <slot name="icon">
        </slot>
      </div>
      <div
        class="last mdc-dialog__content"
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
      <vwc-icon-button
        class="dismiss-button"
        dense=""
        icon="close-line"
        layout="ghost"
      >
      </vwc-icon-button>
    </div>
  </div>
  <div class="mdc-dialog__scrim">
  </div>
</div>

```

