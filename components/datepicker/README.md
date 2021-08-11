# vwc-datepicker

The `vwc-datepicker` component wraps a date-containing `vwc-textfield` and enables easy date picking.
Bases on [Flatpicker](https://flatpickr.js.org/).

# Usage

```html
<vwc-datepicker closeOnSelect clickOpen allowInput dateFormat="d/m/Y">
  <vwc-textfield value="13/12/1999"></vwc-textfield>
</vwc-datepicker>
```

The datepicker will parse the textfield's content according to its [`dateFormat`](https://flatpickr.js.org/formatting/) attribute and present a picker to the user. After a date is selected, the picker will set the textfield's value according to that same `dateFormat`.

In order to set/get date values one should directly alter the textfield.
