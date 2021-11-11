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
      <div class="vwc-card-header">
        <slot name="graphics">
        </slot>
        <vwc-text
          class="vwc-card-title"
          font-face="subtitle-2"
          tight=""
        >
        </vwc-text>
      </div>
      <div class="vwc-card-subtitle">
      </div>
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

