# vwc-tooltip
A Tooltip is a page overlay that provides additional information about an interacted target. It's commonly shown on mouse hover or focus.  
A tooltip displays non-interactive clarifying text related to a trigger element.  

Note that touch screen devices do not share the same pointer input events and may fail to show anything.

Consider avoiding the use of tooltip as it may fail to produce the same UX for ALL users. if must, contemplate on practices such as `aria-describedby` to add alternative experience to users who aren't able to interact with a control in the same manner sighted users do.


## Using the Tooltip right
### the trigger
The tooltip can be placed on interactive controls (things that can be clicked or focusable) such as:
- button
- checkbox
- input text

The tooltip can't be placed on non-interactive element such as paragraph or plain div.  
Do not target non-interactive controls as a tooltip's anchor (such as non-focusable / disabled elements). The absence of user interaction will prevent the tooltip from showing up.

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
| `--tooltip-inline-size` | 240px   | Controls the tooltip width |

