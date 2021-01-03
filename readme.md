[![Quality Status](https://github.com/Vonage/vivid/workflows/Compile%20&%20Test/badge.svg)](https://github.com/Vonage/vivid/actions?query=workflow%3A%22Compile+%26+Test%22)
[![Coverage Status](https://coveralls.io/repos/github/Vonage/vivid/badge.svg?t=v9CrbP)](https://coveralls.io/github/Vonage/vivid)

# Meet VIVID,

### Vonage's design system

###### Vivid provides components and tools to help product teams work more efficiently, deliver faster and safer, while providing end-users single Vonage unique look & feel.

![Meed Vivid](assets/images/meet-vivid.svg)

Vivid delivers a Design System built along Vonage's branding guidelines - all this by providing a ready-to-use web components and services.

Striving to stick to the best practices and most up to date starndards, Vivid's goal is to provide high quality, easy to use, well-maintained and well documented UI platform for all Vonage products.

Below there are few essential highlights about the project, complemented by the relevant links for a deep-divers whereever relevant.

---

### Getting started

We are working hard to make a our consumers' experience as smooth as possible.

#### Design System

Design System is maintained by the designers team in Figma.
Many of those 'raw' materials are automatically pulled into the Vivid's components implementation - so that we'll all rely on a single source of truth.

See more on this aspect in the **Design System** documentation section.

#### Components & Services

Developing over Vivid is to actually use our services and components.

See detailed guides on How To in the Guides documentation section.

#### Examples

We are using **Storybook** platform to exemplify our deliveries.
There are several Storybooks available, each for it's own sake:
- the latest production version is shown here: [vivid.vonage.com](https://vivid.vonage.com)
- the currently development state (reflecting our main branch) is here: [dev.vivid.vonage.com](https://dev.vivid.vonage.com)
- each pull-request also has it's own deployment, so that any feature in progress can be reviewed instantly - those dynamic deployments can be found in the GitHub's PR pages

---
---

Old content

Our architectural approach in general is [here](https://github.com/Vonage/vivid/docs/architecture.md).

Contributor guidance is [here](https://github.com/Vonage/vivid/docs/contributing.md).

---

#### Consumption

Our deliveries are available as GitHub packages, they are privately accessible within Vonage organization.

Please visit [Vivid packages page](https://github.com/Vonage/vivid/packages) to enlist our latest releases. You may further drill into each package to read its specific documentation, review previous versions etc.

GitHub packages may be consumed via various build systems, please refer to [this documentation](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem) for more details.

Obviously, most likely Vivid products will be consumed as **npm** dependencies in **package.json**, specific documentation on that is located [here](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package).

---

##### Common

| Component    | Package                                                                                                                                      | Status | Issues                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `vvd-fonts`  | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235315) | GA     | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+font+fonts)          |
| `vvd-scheme` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235300) | GA     | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+scheme+schema+theme) |

##### Generic/Atomic components

| Component               | Package                                                                                                                                              | Status      | Issues                                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `<vwc-button>`          | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/165931)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+button)                     |
| `<vwc-callout>`         | -                                                                                                                                                    | planned     | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+callout)                    |
| `<vwc-checkbox>`        | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235311)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+checkbox)                   |
| `<vwc-chip>`            | -                                                                                                                                                    | in progress | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+chip+chips)                 |
| `<vwc-drawer>`          | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235307)         | in progress | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+drawer)                     |
| `<vwc-dropdown>`        | -                                                                                                                                                    | planned     | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+dropdown)                   |
| `<vwc-fab>`             | -                                                                                                                                                    | in progress | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+fab)                        |
| `<vwc-formfield>`       | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235309)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+formfield)                  |
| `<vwc-icon>`            | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235306)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+icon)                       |
| `<vwc-linear-progress>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.12-alpha.0&color=green&logo=github)](https://github.com/Vonage/vivid/packages/267584) | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+linear+progress)            |
| `<vwc-list>`            | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235303)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+list)                       |
| `<vwc-menu>`            | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235299)         | in progress | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+menu)                       |
| `<vwc-modal>`           | -                                                                                                                                                    | planned     | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+modal)                      |
| `<vwc-radio>`           | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/282592)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+radio)                      |
| `<vwc-scheme-select>`   | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235304)         | in progress | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+scheme+schema+theme+select) |
| `<vwc-select>`          | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235301)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+select)                     |
| `<vwc-slider>`          | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/251037)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+slider)                     |
| `<vwc-switch>`          | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235302)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+switch)                     |
| `<vwc-table>`           | -                                                                                                                                                    | planned     | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+table)                      |
| `<vwc-textfield>`       | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/166369)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+textfield)                  |
| `<vwc-textarea>`        | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235308)         | GA          | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+textarea)                   |

##### High level Vonage specific components

| Component                | Package                                                                                                                                      | Status  | Issues                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `<vwc-carousel>`         | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/299747) | GA      | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+carousel)                 |
| `<vwc-dialer>`           | -                                                                                                                                            | planned | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+dialer)                   |
| `<vwc-file-picker>`      | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235308) | GA      | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+file+picker+filepicker)   |
| `<vwc-media-controller>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.15.2&color=green&logo=github)](https://github.com/Vonage/vivid/packages/381994) | GA      | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+media+controller)         |
| `<vwc-video>`            | -                                                                                                                                            | planned | [_Issues_](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+video+player+videoplayer) |

---

