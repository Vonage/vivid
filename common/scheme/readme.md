
# Vivid Scheme

Scheme provides color context to Vivid components & applications.
It is an integral part of packages, which are subject to its color tokens.

Scheme is imported by default in all [core](https://github.com/Vonage/vivid/tree/master/common/core) dependent packages but can also be [consumed on its own](#installation).
By default, (if not explicitly defined otherwise by consumer) scheme will result to user's preferred os option (***light***|***dark***|***auto***)
  
Each scheme will provide the same exact color tokens to support **main** context and its **alternating** - contrasting - context . Once imported and set, these tokens are reflected as CSS variables.

![Scheme graph](scheme-graph.png)

Scheme will apply **main** context on _body_ selector and will never apply **alternate** unless explicitly set.
To also be able to modify HTML scopes manually in apps, we include the following css selectors:
##### main
- `body`
- `.vvd-scheme-main`
- `::part(vvd-theme-base)` - for elements within a shadow tree with a matching part attribute
##### alternate
- `.vvd-scheme-alternate`
- `::part(vvd-theme-alternate)` - for elements within a shadow tree with a matching part attribute

### Installation

```bash
yarn add @vonage/vvd-scheme
```
or
```bash
npm i @vonage/vvd-scheme
```

### Consumption

```html
<script type="module" src="../node_modules/@vonage/scheme/vvd-scheme.js"></script>
```
or
```js
import scheme from '@vonage/vvd-scheme';
```

As colors are critical identities of our style, it's advised to include a [link type:modulepreload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/modulepreload) to hint the browser of the module importance, its high priority and preemptively fetch it. 
```html
<script rel="modulepreload" src="../node_modules/@vonage/scheme/vvd-scheme.js"></script>
```

### Features:
| name | description |
|--|--|
| set | a method to set the scheme. options: _light_, _dark_, _syncWithOsSettings_ (defaults to _syncWithOsSettings_) |
| eventBus | acts as **EventTarget** to polyfill the absence of element. can be hooked and callback upon selection - `eventBus.addEventListener('vvd-scheme-select', console.log);`  |
| getSelectedScheme | get current applied scheme (_light_, _dark_)|
| getSelectedSchemeOption | get current option (_light_, _dark_, _syncWithOsSettings_) |


### vwc-scheme-select
Scheme is nicely paired with the [theme-switch](https://github.com/Vonage/vivid/tree/master/components/theme-switch) UI component
