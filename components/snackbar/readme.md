### `vwc-snackbar`

`vwc-snackbar` component dedicated to provide a short-time living and non intrusive / interruptive user notification.

### Structure

`vwc-snackbar` is a 'floating' component.
Position of the component, as well as its contents, are customizable.

### API

#### Attributes / Properties

TBD

#### Events

TBD

#### Customization

##### Slots

| Name      | Required | Description |
|-----------|----------|-------------|
| `action`  | no       | action button, which will perform any action from the consumer domain and close the snackbar with reason `'action'`
| `dismiss` | no       | element, which closes the snackbar with reason `'dismiss'`