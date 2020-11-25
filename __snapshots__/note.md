# `note`

#### `should have internal contents`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>
```

#### `should have internal contents (full layout)`

```html
<div class="note-icon">
  <vwc-icon type="home">
  </vwc-icon>
</div>
<div class="note-text">
  <div class="note-header">
    Title
  </div>
  <slot class="note-message">
  </slot>
</div>

```

## `header`

####   `should have header when header is set`

```html
<div class="note-text">
  <div class="note-header">
    Title
  </div>
  <slot class="note-message">
  </slot>
</div>
```

####   `should have header added when header is set dynamically (property)`

```html
<div class="note-text">
  <div class="note-header">
    Title
  </div>
  <slot class="note-message">
  </slot>
</div>
```

####   `should have header added when header is set dynamically (attribute)`

```html
<div class="note-text">
  <div class="note-header">
    Title
  </div>
  <slot class="note-message">
  </slot>
</div>
```

####   `should have header removed when header is unset (property)`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>
```

####   `should have header removed when header is unset (attribute)`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>
```

## `icon`

####   `should have icon when icon is set`

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

####   `should have icon added when icon is set dynamically (property)`

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

####   `should have icon added when icon is set dynamically (attribute)`

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

####   `should have icon removed when icon is unset (property)`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>
```

####   `should have icon removed when icon is unset (attribute)`

```html
<div class="note-text">
  <slot class="note-message">
  </slot>
</div>
```

