### Introduction

Vivid components are fully taking care of their styling.
Yet there are usually also a simple native HTML elements in use.
Those elements should also comply with the Vivid Design System.

For this reason we are providing **Vivid Context** service, responsible of mounting the Vivid styling into a document context.

The service is optional, but most likely will be needed in any Vonage application.

### API

Attention! As an initial step, to provide smoother migration and lesser friction with an existing systems (especially those heavily dependent on Volta's legacy), we are scoping most of the Vivid context impact by special class: `vivid-scope`.

Please, put `vivid-scope` class at the root of the DOM tree, that is ready to be styled by Vivid.

#### `mount(target)`

**Description**:

Mounts Vivid context (styles) into the target scope / document.
Default target is the document visible in the current scope.
The API is idempotent, the style/s will be mounted only once, even if API called multiple times.

**Params**:
- `target` - `Document` or `DocumentFragment` (including `ShadowRoot`); optional; defaults to `document`

**Throws**:
- if the provided target argument is `null` or not of a type `Document` or `DocumentFragment`

### Examples

#### Import

```js
import vvdContext from '@vonage/vvd-context';
```

#### Mount context to current document scope

```js
vvdContext.mount();
```

#### Mount context to a document of choice

```js
const shadowRoot = someElement.shadowRoot;
vvdContext.mount(shadowRoot);
```