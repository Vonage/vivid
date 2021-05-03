# vwc-banner

## Properties

| Property      | Type                   | Description |
|---|---|---|
| `connotation` | `BannerConnotation` | The connotation of the component
| `dismissible` | `boolean` | When `true` a "dismiss" button will be presented, allowing the user to dismiss the banner message |
| `icon` | `string` | The type id of the icon to be presented to the left of `message` |
| `message` | `string` | The banner's main message
| `open` | `boolean` | Determines whether the banner is visible of hidden (collapsed)

## Events

| Name | Description |
|---|---|
| `closing` | Fires whenever the the banner has started its closing animation |
| `closed` |  Fires when the closing animation is done |
| `opening` | Fires whenever the the banner has started its opening animation |
| `opened` |  Fires when the opening animation is done |

## Slots

| Name | Description |
|---|---|
| `actionItems` | Used to contain action buttons |

