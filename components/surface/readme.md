### `vwc-surface`

`vwc-surface` component dedicated mostly for internal Vivid's usage.

TODO: usage example

### Structure

TBD

### API

#### Attributes / Properties

| Property   | Attribute  | Type     | Default | Description |
|------------|------------|----------|---------|-------------|
| `anchor`   | `anchor`   | TBD | TBD | TBD |
| `position` | `position` | `"TOP-START" | "TOP-CENTER" | "TOP-END" | "BOTTOM-START" | "BOTTOM-CENTER" | "BOTTOM-END" ` | `"BOTTOM-CENTER"` | defines the position of the surface relative to anchor |

#### Methods

| Method  | Arguments | Result | Description |
|---------|-----------|--------|-------------|
| `open`  |           | `void` | opens the surface |
| `close` |           | `void` | closes the surface |

#### Events

| Event     | Details | Description |
|-----------|---------|-------------|
| `opening` |         | fired when the surface starts an opening animation
| `opened`  |         | firer when the surface full shown (post animation)
| `closing` |         | fired when the surface starts closing animation
| `closed`  |         | fired when the surface fully closed

#### Customization

TBD

##### Slots

`vwc-surface` component has a single default slot, which is the mean to present whatever content onto the surface

| Name    | Required | Description |
|---------|----------|-------------|
| default | no       | surfaced content |
