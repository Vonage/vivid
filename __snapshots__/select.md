# `select`

## `init flow`

####   `should have the required elements`

```html
<vwc-select>
  <vwc-list-item
    activated=""
    aria-disabled="false"
    aria-selected="true"
    mwc-list-item=""
    role="option"
    selected=""
    tabindex="0"
  >
    Item 1
  </vwc-list-item>
  <vwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    role="option"
    tabindex="-1"
  >
    Item 2
  </vwc-list-item>
</vwc-select>

```

## `select with icon`

####   `should have vwc-icon when used with icon`

```html
<div class="mdc-select mdc-select--no-label mdc-select--outlined mdc-select--with-leading-icon">
  <input
    class="formElement"
    hidden=""
  >
  <div
    aria-autocomplete="none"
    aria-disabled="false"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-invalid="false"
    aria-labelledby="label"
    aria-required="false"
    class="mdc-select__anchor"
    role="combobox"
    tabindex="0"
  >
    <vwc-notched-outline class="mdc-notched-outline vvd-notch">
    </vwc-notched-outline>
    <vwc-icon
      class="vvd-select-icon"
      size="medium"
      type="home"
    >
    </vwc-icon>
    <span class="mdc-select__selected-text-container">
      <span
        aria-label="current selection"
        class="mdc-select__selected-text"
        role="textbox"
      >
        Item 1
      </span>
    </span>
    <vwc-icon
      class="vvd-select-dropdown-icon"
      size="medium"
      type="down"
    >
    </vwc-icon>
  </div>
  <mwc-menu
    activatable=""
    class="mdc-menu mdc-menu-surface mdc-select__menu"
    innerrole="listbox"
    wrapfocus=""
  >
    <slot>
    </slot>
  </mwc-menu>
</div>

```

