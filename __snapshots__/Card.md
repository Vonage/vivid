# `Card`

#### `should internal contents`

```html
<vwc-elevation>
  <div class="vwc-card">
    <div class="vwc-card-container">
      <div class="vwc-card-media">
        <slot name="media">
        </slot>
      </div>
      <slot name="main">
        <div class="vwc-card-content">
          <div class="vwc-card-wrapper">
            <header class="no-content vwc-card-header">
              <slot name="graphic">
              </slot>
              <div>
                <div class="vwc-card-title">
                </div>
                <div class="vwc-card-subtitle">
                </div>
              </div>
            </header>
            <slot name="meta">
            </slot>
          </div>
          <div class="vwc-card-text">
          </div>
        </div>
      </slot>
      <div class="no-content vwc-card-footer">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</vwc-elevation>

```

