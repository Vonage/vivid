# Getting started with Vivid

### For developers & designers

###### A system for you! With Vivid packages, libraries and web components you won't have to build and style from scratch ever again.

![Getting started](assets/images/getting-started.svg)

We are working hard to make a our consumers' experience as smooth as possible.

Vivid team produces contents for and with both, the designers team and the Web developers.

[Back to main page](../readme.md)

### Design System

Design System is maintained by the designers team across Vonage in Figma tool.
Many of those 'raw' materials are automatically pulled into the Vivid's components implementation - so that we'll all rely on a single source of truth.
We are constanly working to make that automation process more robust, while still widening the automated area.

See more on this aspect in the **Design System** documentation section.

---

### Components & Services

Developing over Vivid is to actually use our services and components in the business applications.
Indeed, we can primarily split our product into **services** and **components**.

#### Services

Some of the generic functionalities are provided as services.
For example, one can user `vvd-scheme` service to manage the scheme, be notified of scheme changes etc.
Another noticable service is `vvd-context`, which is responsible for setting up a Vivid's styling of the generic HTML elements (`h1`, `p`, `code` etc).

#### Components

Most of the Vivid's value can be achieved via directly using our components.
Encapsulated by means of `ShadowDOM`, scrutinely styles and funcionalized according to the Design System UI/UX and thoroughly tested - those are a solid building blocks for any Vonage web application.

We are set first to deliver the simple building blocks - **atom** components, like `vwc-button`, `vwc- icon`, `vwc-select` etc. 

On top of those, we are going to deliver, and actually already have some, of the complex components - **composite** ones, like `vwc-carousel` ,`vwc-file-picker`, `vwc-media-controller` etc.

---

### Preview

We are using **Storybook** platform to document and exemplify our deliveries.
There are several Storybooks available, each for it's own sake:
- the latest production version is shown here: [vivid.vonage.com](https://vivid.vonage.com)
- the currently development state (reflecting our main branch) is here: [dev.vivid.vonage.com](https://dev.vivid.vonage.com)
- each pull-request also has it's own deployment, so that any feature in progress can be reviewed instantly - those dynamic deployments can be found in the GitHub's PR pages

Additionally, we maintain the following showcases:
* [Icons gallery](https://icons.vivid.vonage.com)