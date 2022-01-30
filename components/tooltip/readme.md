# vwc-tooltip
A Tooltip is a page overlay that displays non-interactive clarifying text related to a trigger element.

## Using the Tooltip right
### the trigger
The tooltip can be placed on interactive controls (things that can be clicked or focusable) such as:
- button
- checkbox
- input text

The tooltip can't be placed on  non-interactive element such as paragraph or plain div.

### the tooltip
The tooltip is a description and therefor, the tooltip itself can not be interactive.  
`vwc-tooltip` contain only text.

## Accessibility
be sure to add `aria-describedby="the vwc-tooltip ID name"` on the tooltip trigger element for screen readers readability.


## Properties
| Property | Attribute     | Type                         | Default    |
|----------|---------------|------------------------------|------------|
| `text`   | `text`        | `string \| undefined` |             |
| `open`   | `open`        | `boolean`                    | false      |
| `corner` | `corner`   | `string`                     | "bottom"   |
| `styles` |               | `CSSResult`                  | "style"    |

## CSS Custom Properties

| Property                | Default | Description                |
|-------------------------|---------|----------------------------|
| `--tooltip-inline-size` | 250px   | Controls the tooltip width |

