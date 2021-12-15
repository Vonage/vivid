# `Card`

#### `should internal contents`

```html
<div class="vwc-card">
  <div class="vwc-card-media">
    <slot name="media">
    </slot>
  </div>
  <div class="vwc-card-info">
    <header class="no-content vwc-card-header">
      <div class="vwc-card-header-content">
        <slot name="graphics">
        </slot>
        <div>
          <div class="vwc-card-title">
          </div>
          <div class="vwc-card-subtitle">
          </div>
        </div>
      </div>
      <slot name="actionItem">
      </slot>
    </header>
    <div class="vwc-card-supportText">
    </div>
    <div class="no-content vwc-card-footer">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

