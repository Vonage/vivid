# vwc-button

Here is a description of my web component.

## Attributes

| Attribute | Type      | Default         | Description                                      |
|-----------|-----------|-----------------|--------------------------------------------------|
| `header`  |           |                 | The header text of this element                  |
| `my-attr` |           | "default value" |                                                  |
| `switch`  | `on\|off` |                 | Here is an attribute with either the "on" or "off" value. |

## Properties

| Property                  | Attribute  | Type                                      | Default | Description                                      |
|---------------------------|------------|-------------------------------------------|---------|--------------------------------------------------|
| `buttonElement`           |            | `HTMLElement`                             |         |                                                  |
| `color`                   | `color`    | `"red"\|"green"\|"blue"`                  | "red"   | This is a description of a property with an attribute with exactly the same name: "color". |
| `dense`                   |            | `boolean`                                 |         |                                                  |
| `disabled`                | `disabled` | `Boolean`                                 |         | This jsdoc tag documents an attribute.           |
| `floatingLabelFoundation` |            | `MDCFloatingLabelFoundation \| undefined` |         |                                                  |
| `fullwidth`               |            | `boolean`                                 |         |                                                  |
| `icon`                    |            | `string`                                  |         |                                                  |
| `label`                   |            | `string`                                  |         |                                                  |
| `lineRippleFoundation`    |            | `MDCLineRippleFoundation \| undefined`    |         |                                                  |
| `myProp`                  | `my-prop`  | `number`                                  | 10      | This is a description of a property with an attribute called "my-prop". |
| `outlined`                |            | `boolean`                                 |         |                                                  |
| `raised`                  |            | `boolean`                                 |         |                                                  |
| `ripple`                  |            | `Promise<Ripple \| null>`                 |         |                                                  |
| `trailingIcon`            |            | `boolean`                                 |         |                                                  |
| `unelevated`              |            | `boolean`                                 |         |                                                  |
| `value`                   |            |                                           |         |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `blur`  | `(): void` |
| `focus` | `(): void` |

## Events

| Event    | Description                                      |
|----------|--------------------------------------------------|
| `change` | This jsdoc tag makes it possible to document events. |
| `submit` |                                                  |

## Slots

| Name    | Description                                |
|---------|--------------------------------------------|
|         | This is an unnamed slot (the default slot) |
| `end`   |                                            |
| `start` | This is a slot named "start".              |

## CSS Shadow Parts

| Part        |
|-------------|
| `container` |

## CSS Custom Properties

| Property          | Default | Description                                      |
|-------------------|---------|--------------------------------------------------|
| `--main-bg-color` |         | This jsdoc tag can be used to document css custom properties. |
| `--main-color`    | "red"   |                                                  |
