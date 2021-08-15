# `Card`

#### `should internal contents`

```html
<div class="vwc-card">
  <div class="vwc-card-media">
    <slot name="media">
    </slot>
  </div>
  <div class="vwc-card-info">
    <header class="no-header-content">
      <div class="vwc-card-header">
        <slot name="graphics">
        </slot>
        <div class="vwc-card-header-text">
        </div>
      </div>
      <div class="vwc-card-subtitle">
      </div>
    </header>
    <div class="vwc-card-content">
    </div>
    <div class="no-actions-content vwc-card-actions">
      <slot name="actions">
      </slot>
    </div>
  </div>
</div>

```
