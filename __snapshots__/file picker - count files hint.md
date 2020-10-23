# `file picker - count files hint`

#### `should have counter set to number when valid choice`

```html
<label class="wrapper">
  <div class="content part">
    <slot name="dd-hint">
      <span class="dd-hint">
        Drag & Drop files here
      </span>
    </slot>
    <slot name="button">
    </slot>
    <slot class="input-file-slot">
    </slot>
    <span class="files-count">
      0
    </span>
  </div>
</label>

```

#### `should have counter set to number when valid drop`

```html
<label class="wrapper">
  <div class="content part">
    <slot name="dd-hint">
      <span class="dd-hint">
        Drag & Drop files here
      </span>
    </slot>
    <slot name="button">
    </slot>
    <slot class="input-file-slot">
    </slot>
    <span class="files-count">
      0
    </span>
  </div>
</label>

```

#### `should have counter reset to 0 when invalid choice`

```html
<label class="wrapper">
  <div class="content part">
    <slot name="dd-hint">
      <span class="dd-hint">
        Drag & Drop files here
      </span>
    </slot>
    <slot name="button">
    </slot>
    <slot class="input-file-slot">
    </slot>
    <span class="files-count">
      0
    </span>
  </div>
</label>

```

#### `should have counter reset to 0 when invalid drop`

```html
<label class="wrapper">
  <div class="content part">
    <slot name="dd-hint">
      <span class="dd-hint">
        Drag & Drop files here
      </span>
    </slot>
    <slot name="button">
    </slot>
    <slot class="input-file-slot">
    </slot>
    <span class="files-count">
      0
    </span>
  </div>
</label>

```

