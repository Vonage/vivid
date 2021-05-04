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

| Property        | Attribute        | Type     | Default | Description |
|-----------------|------------------|----------|---------|-------------|
| `position`      | `position`       | `"TOP-START" | "TOP-CENTER" | "TOP-END" | "BOTTOM-START" | "BOTTOM-CENTER" | "BOTTOM-END" ` | `"BOTTOM-CENTER"` | defines the position of the snackbar |
| `connotaion`    | `connotation`    | `"alert" | "announcement" | "cta" | "info" | "success" | "warning"` | `"announcement"` |  | connotation color will be reflected in icon color, if present |
| `icon`          | `icon`           | `string`  | `undefined` | icon type to show, if any |
| `header`        | `header`         | `string`  | `undefined` | header of the message body |
| `message`       | `message`        | `string`  | `undefined` | message of the message body |
| `dismissible`   | `dismissible`    | `boolean` | absent (`false`) | when property set to `true` (attribute present) the dismiss button will be shown |
| `timeoutMs`     | `timeoutms`      | `number` (4000-10000) | `5000`      | time to wait (in millis) till the snackbar auto dismiss |

#### Events

Closing events are supplied with detailed `reason`, which may be either `action` in case the action button used, or `dismiss`.

Therefore, although consumer might be using the own button supplied via slot (see below) to hook and act on clicks, it is a better approach to actually listen on the events of snackbar and act according the the `reason` supplied.

| Event     | Details | Description |
|-----------|---------|-------------|
| `opening` |         | fired when the snackbar starts an opening animation
| `opened`  |         | firer when the snackbar full shown (post animation)
| `closing` | `{ "reason": "action" | "dismiss" }` | fired when the snackbar starts closing animation
| `closed`  | `{ "reason": "action" | "dismiss" }` | fired when the snackbar fully closed

#### Customization

Beside an obvious customizations via the properties/attributes, which include the connontation color, icon, and text, consumer can provide an `action` button via the slot.

##### Slots

| Name      | Required | Description |
|-----------|----------|-------------|
| `action`  | no       | action button, which will close the snackbar with reason `'action'`

> Note: in order to comply with the design, please use `outlined` button (in legacy mode use `filled` one).