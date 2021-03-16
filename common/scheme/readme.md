
# Vivid Scheme

Scheme provides color context to Vivid components & applications.
It is an integral part of packages, which are subject to its color tokens.

Scheme is imported by default in all _core_ dependent packages but can also be [consumed on its own](#installation).
By default (if not explicitly defined otherwise by consumer) scheme will result to user's preferred os option (***light***|***dark***|***auto***)
  
Each scheme will provide the same exact color tokens to support **main** context and its **alternating** - contrasting - context . Once imported and set, these tokens are reflected as CSS variables.

```mermaid
graph TB
A(Scheme semantic variables list) --> B((Theme - Light))
A --> C((Theme - Dark))
B --> D[Main context]
B --> E[Alternate context]
C --> D
C --> E
```

Scheme will apply **main** context on _body_ selector while never apply alternate unless explicitly set.
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
import schemeService from '@vonage/vvd-scheme';
```

As colors are critical identities of our style, it's advised to include a [link type:modulepreload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/modulepreload) to hint the browser of the module importance, its high priority and preemptively fetch it. 
```html
<script rel="modulepreload" src="../node_modules/@vonage/scheme/vvd-scheme.js"></script>
```

  




## Features:
| name | description |
|--|--|
| set | a method to set the scheme. options: _light_, _dark_, _syncWithOsSettings_ (defaults to _syncWithOsSettings_) |
| eventBus |  |

getSelectedScheme,

getSelectedSchemeOption,


### vwc-scheme-select