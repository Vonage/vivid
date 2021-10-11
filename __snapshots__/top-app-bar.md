# `top-app-bar`

#### `should internal contents`

```html
<header class="mdc-top-app-bar">
  <div class="mdc-top-app-bar__row">
    <section
      class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
      id="navigation"
    >
      <slot name="navigationIcon">
      </slot>
      <span class="mdc-top-app-bar__title">
        <slot name="title">
        </slot>
      </span>
    </section>
    <section
      class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
      id="actions"
      role="toolbar"
    >
      <slot name="actionItems">
      </slot>
    </section>
  </div>
</header>
<div class="mdc-top-app-bar--fixed-adjust">
  <slot>
  </slot>
</div>

```

