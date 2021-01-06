# Installation

### Get started with our services and components

###### There are just a few steps to perform to get Vivid eco-system up and running within a hosting application. This guide explains how to do it and describes possible 'gotchas' along the way.

![Installation](assets/images/installation.svg)

[Back to main page](../readme.md)

Our deliveries are available as GitHub packages, they are privately accessible within Vonage organization.

Please visit [Vivid packages page](https://github.com/Vonage/vivid/packages) to enlist our latest releases. You may further drill into each package to read its specific documentation, review previous versions etc.

GitHub packages may be consumed via various build systems, please refer to [this documentation](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem) for more details.

Obviously, most likely Vivid products will be consumed as **npm** dependencies in **package.json**, specific documentation on that is located [here](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package).

---

### Getting the packages

The preferred way to make our package available to your application is to install the whole Vivid's bundle.
For a specific cases, one may also chose to 'cherry-pick' the specific packages one by one.

#### Installation

If you're using a bundler that is capable of tree-shaking to bundle up your application's code (such as WebPack), you can install Vivid by running this command:

```
npm install @vonage/vivid --save-prod
```

This will make the latest `@vonage/vivid` package available in your project, so you can begin using any of its components.
For instance, if you'd like to use the [`<vwc-button>`](https://vivid.vonage.com/?path=/story/components-atoms-button--filled) component, you can import it like this:

```javascript
import { VWCButton } from '@vonage/vivid';

VWCButton;  // This line is required to indicate to your bundler that VWCButton is used, and should therefore not be 'shaken' out of its resulting code bundle
```

> To find out the export name for the component you use (`VWCButton` in the example above), please refer to its documentation.

> Notice that the returned value is the Custom Element definition class (inherits from HTMLElement), but you don't need to directly use it, as we will already register it for you. You may, however, wish to keep a reference to that imported variable to prevent bundlers from 'shaking off' the component definition.

From now on, `vwc-button` will be registered in your DOM API, so you can instantly use it in your HTML, or like this:

```javascript
const myButton = document.createElement('vwc-button');
```

##### Installing Components Individually

In cases where your bundler can't perform 'tree-shaking' (remove parts of code that are not actually used within your code), you may wish to install and use Vivid packages individually.

> Attention! Using Vivid components individually is discouraged and should be strictly confined to the cases where the '@vonage/vivid' package cannot be used.

To install a specific package, for example `@vonage/vwc-button`, run:

```
npm install @vonage/vwc-button --save-prod
```
 
> Notice that all Vivid packages installed within a single project should be of the same version! Make sure that all of Vivid's components listed in your `package.json` point to the exact same version!

Then you can import a component like this:

```javascript
import "@vonage/vwc-button";
```

And use it:

```javascript
const myButton = document.createElement('vwc-button');
```
