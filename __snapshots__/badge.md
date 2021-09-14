# `badge`

#### `should match internal contents`

```html

```

#### `should match internal contents (legacy)`

```html
<span class="vwc-badge">
  <slot>
  </slot>
</span>

```

## `icons`

####   `should have icons when icons are set`

```html
<span class="vwc-badge">
  <div class="icon icon--leading">
    <vwc-icon type="thumbs-down-line">
    </vwc-icon>
  </div>
  <slot>
  </slot>
  <div class="icon icon--trailing">
    <vwc-icon type="thumbs-up-line">
    </vwc-icon>
  </div>
</span>

```

####   `should have icons added when icons are set dynamically (property)`

```html
<span class="vwc-badge">
  <div class="icon icon--leading">
    <vwc-icon type="thumbs-down-line">
    </vwc-icon>
  </div>
  <slot>
  </slot>
  <div class="icon icon--trailing">
    <vwc-icon type="thumbs-down-line">
    </vwc-icon>
  </div>
</span>

```

####   `should have icons added when icons are set dynamically (attribute)`

```html
<span class="vwc-badge">
  <div class="icon icon--leading">
    <vwc-icon type="thumbs-down-line">
    </vwc-icon>
  </div>
  <slot>
  </slot>
  <div class="icon icon--trailing">
    <vwc-icon type="thumbs-up-line">
    </vwc-icon>
  </div>
</span>

```

####   `should have icons removed when icons are unset (property)`

```html
<span class="vwc-badge">
  <slot>
  </slot>
</span>

```

####   `should have icon removed when icon is unset (attribute)`

```html
<span class="vwc-badge">
  <slot>
  </slot>
</span>

```

