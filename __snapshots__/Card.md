# `Card`

#### `should internal contents`

```html
<div class="vwc-card">
  <div class="vwc-card-media">
    <slot name="media">
    </slot>
  </div>
  <div class="vwc-card-info">
    <header class="no-content">
      <div class="vwc-card-header-wrapper">
        <div class="vwc-card-header">
          <slot name="graphics">
          </slot>
          <div class="vwc-card-title">
          </div>
        </div>
        <div class="vwc-card-subtitle">
        </div>
      </div>
      <slot name="top-action">
      </slot>
    </header>
    <div class="vwc-card-supportText">
    </div>
    <div class="no-content vwc-card-actions">
      <slot name="actions">
      </slot>
    </div>
  </div>
</div>

```

