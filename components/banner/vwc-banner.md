# vwc-banner

## Properties

| Property      | Attribute     | Type                                             | Default         |
|---------------|---------------|--------------------------------------------------|-----------------|
| `ariaLive`    | `aria-live`   | `AriaLive`                                       | "polite"        |
| `connotation` | `connotation` | `Connotation.Success \| Connotation.Alert \| Connotation.Warning \| Connotation.Info \| Connotation.Announcement \| undefined` |                 |
| `dismissible` | `dismissible` | `boolean \| undefined`                           |                 |
| `icon`        | `icon`        | `string \| undefined`                            |                 |
| `message`     | `message`     | `string`                                         | ""              |
| `open`        | `open`        | `boolean`                                        | false           |
| `override`    |               |                                                  |                 |
| `role`        | `role`        | `Role`                                           | "status"        |
| `styles`      |               | `CSSResult[]`                                    | ["BannerStyle"] |

## Methods

| Method                | Type          |
|-----------------------|---------------|
| `renderDismissButton` | `(): unknown` |
