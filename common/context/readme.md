## install(target)
installs Vivid context (styles) into the target scope / document
- target scope may by any `Document` or `DocumentFragment` (including `ShadowRoot`)
- default target (when not specified) is the document visible in the current scope
- the API is idempotent, the style/s will be installed only once, even if API called multiple times

**Kind**: global function  
**Throws**:

- <code>Error</code> error - if the provided target argument is `null` or not a Node of type `Document` / `DocumentFragment`


| Param | Type | Description |
| --- | --- | --- |
| target | <code>Document</code> \| <code>DocumentFragment</code> | target document/shadow root to install the CSS into |
