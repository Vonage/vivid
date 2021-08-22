# vwc-side-drawer

Represents a side drawer custom element.

## Properties

| Property    | Attribute   | Type                   | Default |
|-------------|-------------|------------------------|---------|
| `absolute`  | `absolute`  | `boolean`              | false   |
| `alternate` | `alternate` | `boolean`              | false   |
| `hasTopBar` | `hasTopBar` | `boolean \| undefined` |         |
| `open`      | `open`      | `boolean`              | false   |
| `type`      | `type`      | `string`               | ""      |

## Methods

| Method                 | Type                             | Description                                      |
|------------------------|----------------------------------|--------------------------------------------------|
| `#closed`              | `(): void`                       | Side drawer finished close animation.            |
| `#createDispatchEvent` | `(eventName: string): void`      | DispatchEvent creator.                           |
| `#notifyClose`         | `(): void`                       | Notify close.                                    |
| `#notifyOpen`          | `(): void`                       | Notify open.                                     |
| `#opened`              | `(): void`                       | Side drawer finished open animation.             |
| `#releaseFocus`        | `(): void`                       | Releases focus trap from root element which was set by `trapFocus`.<br /><br />Notify release focus. |
| `#trapFocus`           | `(): void`                       | Traps focus on root element and focuses the active navigation element.<br /><br />Notify trap focus. |
| `close`                | `(): void`                       | Closes the side drawer from the open state.      |
| `handleScrimClick`     | `(): void`                       | Click handler to close side drawer when scrim is clicked. |
| `onKeydown`            | `({ key }: KeyboardEvent): void` | Keydown handler to close side drawer when key is escape. |
| `onTransitionEnd`      | `(): void`                       | Handles the `transitionend` event when the side drawer finishes opening/closing. |
| `openChanged`          | `(_isOpen: boolean): void`       | Invoked when the element open state is updated.<br /><br />Expressions inside this method will trigger upon open state change.<br /><br />**_isOpen**: Boolean of open state |
| `show`                 | `(): void`                       | Opens the side drawer from the closed state.     |
