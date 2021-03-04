# vwc-dialog

This component is an extension of [<mwc-dialog>](https://github.com/material-components/material-components-web-components/tree/master/packages/dialog)

## API

### Slots

| Name              |	Description
| ----------------- | -------------
| `icon`					  |	A slot meant for an icon. Appears above the heading.
| `primaryAction`   |	A focusable and clickable target. Typically a button such as  `<mwc-button>`. Placed on the bottom right of the dialog (LTR) and above the secondary action when stacked. Automatically clicked when `Enter` key is pressed in the dialog.
| `secondaryAction` |	A focusable and clickable target. Typically a button such as  `<mwc-button>`. Placed immediately to the left of the `primaryAction` (LTR) or below when stacked.
| _default_         |	Content to display in the dialog's content area.

### Properties/Attributes

| Name                    | Type      | Description
| ----------------------- | --------- |------------
| `open`                  | `boolean` | Whether the dialog should open.
| `hideActions`           | `boolean` | Hides the actions footer of the dialog. Needed to remove excess padding when no actions are slotted in.
| `stacked`               | `boolean` | Whether to stack the action buttons.
| `heading`               | `string`  | Heading text of the dialog.
| `scrimClickAction`      | `string`  | _Default: 'close'_ – Action to be emitted with the `closing` and `closed` events when the dialog closes because the scrim was clicked.
| `escapeKeyAction`       | `string`  | _Default: 'close'_ – Action to be emitted with the `closing` and `closed` events when the dialog closes because the excape key was pressed.
| `defaultAction`         | `string`  | _Default: 'close'_ – Action to be emitted with the `closing` and `closed` events when `<mwc-dialog>.open` is toggled.
| `actionAttribute`       | `string`  | _Default: 'dialogAction'_ – Attribute to read in light dom of dialog for closing action value.
| `initialFocusAttribute` | `string`  | _Default: 'dialogInitialFocus'_ – Attribute to search for in light dom for initial focus on dialog open.

### Methods

| Name     | Description
| -------- | -------------
| `forceLayout() => void` | Forces dialog to relayout (animation frame time). May be required if dialog size is incorrect or if stacked layout has not been triggered correctly.
| `focus() => void` | Focuses on the initial focus element if defined.
| `blur() => void`  | Blurs the active element.
| `show() => void`  | Opens the dialog.
| `close() => void` | Closes the dialog.

### Listeners
| Event Name          | Target       | Description
| ------------------- | ------------ | -----------
| `click`             | root element | Detects if clicked target is a dialog action.
| `resize`            | `window `    | Performs dialog layout (passive).
| `orientationchange` | `window`     | Performs dialog layout (passive).
| `keydown`           | `mwc-dialog` | Listens for the enter key to click the default button (passive).
| `keydown`           | `document`   | Listens for the escape key to close the dialog (see [`escapeKeyAction`](#properties)).

### Events

| Event Name | Target       | Detail             | Description
| ---------- | ------------ | ------------------ | -----------
| `opening`  | `mwc-dialog` | `{}`               | Fired when the dialog is beginning to open.
| `opened`   | `mwc-dialog` | `{}`               | Fired once the dialog is finished opening (after animation).
| `closing`  | `mwc-dialog` | `{action: string}` | Fired when the dialog is is beginning to close. Detail is the action that closed the dialog.
| `closed`   | `mwc-dialog` | `{action: string}` | Fired once the dialog is finished closing (after animation). Detail is the action that closed the dialog.
