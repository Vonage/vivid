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
      <div class="vwc-card-content">
        <slot name="content">
          <header class="no-content vwc-card-header">
            <div class="vwc-card-header-content">
              <slot name="graphic">
              </slot>
              <div>
                <div class="vwc-card-title">
                </div>
                <div class="vwc-card-subtitle">
                </div>
              </div>
            </div>
            <slot name="meta">
            </slot>
          </header>
          <div class="vwc-card-text">
          </div>
        </slot>
      </div>
      <div class="no-content vwc-card-footer">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</vwc-elevation>

```

