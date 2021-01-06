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

#### Bundle installation

To install it in the current folder and to add to the `dependencies` of the `package.json` do:
```
npm install @vonage/vivid@0.18.0 --save-prod
```

One may of course simple add the following to the `dependencies` of the `package.json` and execute a regular installation command (`yarn`, `npm` etc):
```
"@vonage/vivid": "0.18.0"
```

> Please, make sure to replace the version with the most recent one.

Bundle installation will bring all the packages of the Vivid to the `node_modules`.
Now you can use Vivid's services and/or components in your application.
If you use a **WebPack** as your application bundler, it will automatically take only the relevant code into your application while tree-shake away anything unused.

Few points to pay attention for:
* When components used only as HTML elements, you still need to import the component class even if it's a side-effect import, in order to prevent them to be tree-shaken away
* If the bundler of your choice is not a WebPack, you probably will not benefit from tree- shaking cleanup, in this case you may consider it better to use a `cherry-pick` approach, see below

#### Cherry-pick installation

In some cases one may prefer to install Vivid packages one-by-one, enhancing that used components list as the usage grows.

In general, this approach may end up less convenient, specifically due to the fact that each version bump will require careful update of all components. Yet, there are justifications to do so, see the remark regarding the tree-shaking and bundlers support in the section above.

Attention! As of now, all Vivid packages used in one's system MUST be of the same version exactly. While a bundle installation approach takes care for that, 'cherry-picking' of the packages implies an extra care to preserve this manually.

Installing the package is, again, as simple as the usual NPM package installation. It is either running:
```
npm install @vonage/vwc-button@0.18.0 --save-prod
```

or adding the following to the `package.json`'s `dependencies` section:
```
"@vonage/vwc-button": "0.18.0"
```

> Pay attention: we strongly advice to NOT use a range versioning syntax, but stick to the strict version, having it the same for all of the Vivid's packages.