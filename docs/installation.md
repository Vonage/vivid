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
In some specific cases, one may chose to install components individually, as described in a second section below.

Whichever path you'll decide to take, Vonage's **artifactory** access setup required,
see more on that in the third secton below.

#### Installing the bundle

If you're using a bundler that is capable of tree-shaking to bundle up your application's code (such as WebPack), you can install Vivid by running this command:

```
npm install @vonage/vivid --save-prod
```

This will make the latest `@vonage/vivid` package available in your project, so you can begin using any of its components.
For instance, if you'd like to use the `vwc-button` component, you can import it like this:

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

#### Installing components individually

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

#### Artifactory setup

It is a preferred Vonage's strategy as well as widely used organisational best practice to manage code dependencies in a dedicated, internally managed artifactory.

Vivid is aligned with this approach, hence a list of steps to help you to setup the artifactory access on local machines as well as in CI environment.

##### Configure `.npmrc`

`.npmrc` file should be located in the same folder the `package.json` resides and it's content should include the following:

```
ca = null
always-auth = true

registry = https://vonagecc.jfrog.io/vonagecc/api/npm/npm/
_auth = \${ARTIFACTORY_AUTH_TOKEN}
```

Here we defined 2 primary things:
* NPM should pull the package from that registry (Vonage's artifactory) rather than from generic public one
* Since the artifactory is protected, it should use the specified **authentication token**

Obviously, authentication token better NOT to be hard-coded in your sources, but taken from environment, meaning that all local dev machines and the CI should have it set apriory.

> You may read more info about `.npmrc` configuration [here](https://docs.npmjs.com/cli/v6/configuring-npm/npmrc).

##### Obtaining artifactory token

Each developer in a team that does `npm install` will need to get her/his access token.
Additionally, team is advised to obtain one more token for automation.

The steps to follow are:
* for each user reach out to CloudOps team and ask for an access to JFrog artifactory (welcome to copy this exact wording to the Jira ticket :) ) - this may take a few days
* once allowed, do login into the **JFrog** portal (application will appear in your Vonage app page), navigate to **User Profile** and copy your **API Key**
* run on your local machine the following
  
	```
	curl --silent --show-error --fail -u "username:api_key" https://vonagecc.jfrog.io/vonagecc/api/npm/auth
	```
	
	while replacing 'username' and 'api_key' with your JFrog username and the just copied API Key correspondingly
* in the response you'll see an `_auth` value - this is the token to be exported as `ARTIFACTORY_AUTH_TOKEN` as per our example above (in your case the variable name may differ, your choice)

Done!