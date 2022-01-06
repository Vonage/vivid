# `side-drawer`

#### `should internal contents`

```html
<aside
  aria-modal="false"
  class="side-drawer side-drawer-dismissible"
>
  <div class="side-drawer-content">
    <slot>
    </slot>
  </div>
</aside>
<div class="side-drawer-app-content">
  <slot name="app-content">
  </slot>
</div>

```

