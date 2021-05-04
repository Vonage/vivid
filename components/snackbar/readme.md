### `vwc-snackbar`

`vwc-snackbar` component dedicated to provide a short-time living and non intrusive / interruptive user notification.

```html
<vwc-snackbar
	header="Header (optional)"
	message="The message of the snackbar goes here"
	icon="megaphone-solid"
	connotation="alert"
	dismissible>
	<vwc-button slot="action" layout="outlined">Show more</vwc-button>
</vwc-snackbar>
```

The visiblity time is set by default to 4000 ms and may be extended to maximum 10000 ms via API.

`vwc-snackbar` can be configured as `dismissible`, in which case user will be provided with a dismiss button.
This won't change the auto-dismiss behaviour, but will let the user to close the snackbar even earlier.

`vwc-snackbar` allows to add a single action button, if needed.

#### Legacy (Volta)

To have the `vwc-snackbar` appearance matching the legacy Volta, please use `legacy` attribute.

### Structure

`vwc-snackbar` is a 'floating' component.
Position of the component, as well as its contents, are customizable.

### API

#### Attributes / Properties

| Attribute | Property | Type | Description |
|-----------|----------|------|-------------|

#### Events

| Event | Details | Description |
|-------|---------|-------------|

#### Customization

##### Slots

| Name      | Required | Description |
|-----------|----------|-------------|
| `action`  | no       | action button, which will close the snackbar with reason `'action'`
