# `note`

#### `should internal contents`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>
```

#### `should have icon when icon is set`

```html
<div class="note-icon">
  <vwc-icon type="home">
  </vwc-icon>
</div>
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>
```

#### `should have icon added when icon is set dynamically (property)`

```html
<div class="note-icon">
  <vwc-icon type="home">
  </vwc-icon>
</div>
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>

```

#### `should have icon added when icon is set dynamically (attribute)`

```html
<div class="note-icon">
  <vwc-icon type="home">
  </vwc-icon>
</div>
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>

```

#### `should have icon removed when icon is unset (property)`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>

```

#### `should have icon removed when icon is unset (attribute)`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>

```

