# vwc-layout

## Properties

| Property        | Attribute        | Type                                             | Default |
|-----------------|------------------|--------------------------------------------------|---------|
| `autoSizing`    | `auto-sizing`    | `AutoSizing \| undefined`                        |         |
| `columnBasis`   | `column-basis`   | `ColumnBasis`                                    | "sm"    |
| `columnSpacing` | `column-spacing` | `Size.x_Small \| Size.Medium \| Size.x_Large`    | "md"    |
| `gutters`       | `gutters`        | `Size.x_Small \| Size.Medium \| Size.x_Large \| undefined` |         |

## CSS Custom Properties

| Property                       | Default                                          | Description                                      |
|--------------------------------|--------------------------------------------------|--------------------------------------------------|
| `layout-grid-template-columns` | "repeat([the `auto-sizing` mapped value],\tminmax([the `column-basis` mapped value], 1fr))" | Controls the `grid-template-columns` of the layout |
