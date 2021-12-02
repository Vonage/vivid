# vwc-tip
vwc-tip goal is to provide helpful, additional content. </br>
The tooltip is paired to a button that triggers it on click. </br>

## Basic usage
The following will generate a trigger button with tip-popup:
```
<vwc-tip icon="info-line" content="the tooltip text" dismissible="true"></vwc-tip>
```


## Properties

| Property      | Attribute     | Type                       | Default |
|---------------|---------------|----------------------------|---------|
| `anchor`      | `anchor`      | `HTMLElement \| undefined` |         |
| `content`     | `content`     | `string \| undefined`      |         |
| `dismissible` | `dismissible` | `boolean \| undefined`     |         |
| `distance`    | `distance`    | `number`                   | 10      |
| `open`        | `open`        | `boolean`                  | false   |
| `override`    |               |                            |         |
| `placement`   | `placement`   | `Placement`                | "auto"  |
| `styles`      |               | `CSSResult`                | "style" |

## Methods

| Method                 | Type          | Description        |
|------------------------|---------------|--------------------|
| `hide`                 | `(): void`    | Closes the tooltip |
| `show`                 | `(): void`    | Opens the tooltip  |


## CSS Custom Properties

| Property                       | Default                                          | Description                                      |
|--------------------------------|--------------------------------------------------|--------------------------------------------------|
| `--tooltip-width` | 150px | Controls the the width of the tooltip  |

<br>
<hr>

# vwc-tooltip
`vwc-tooltip` can be attached to any active element (icons, text links, buttons, etc.) on a page,
and triggered by either by click or hover using the `show` property. </br>

## Accessibility
Important information should always be on the page, therefore, tooltips shouldn’t be essential for the tasks users need to accomplish on your site.</br>
When using `vwc-tooltip` with hover, remember to support both mouse and keyboard hover (`focus`).</br>
[for additional reading about tooltip usage and tooltip a11y](https://www.nngroup.com/articles/tooltip-guidelines/)

## Properties

| Property      | Attribute     | Type                                             | Default |
|---------------|---------------|--------------------------------------------------|---------|
| `content`     | `content`     | `string \| undefined`                            |         |
| `dismissible` | `dismissible` | `boolean \| undefined`                           |         |
| `distance`    | `distance`    | `number`                                         | 10      |
| `open`        | `open`        | `boolean \| undefined`                           |         |
| `override`    |               |                                                  |         |
| `placement`   | `placement`   | `"auto" \| "auto-start" \| "auto-end" \| "top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "right" \| "right-start" \| "right-end" \| "left" \| "left-start" \| "left-end"` | "auto"`  |
| `styles`      |               | `CSSResult`                                      | "style" |

## CSS Custom Properties

| Property                       | Default                                          | Description                                      |
|--------------------------------|--------------------------------------------------|--------------------------------------------------|
| `--tooltip-width` | 150px | Controls the the width of the tooltip  |
