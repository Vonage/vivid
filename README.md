<p align="center">
  <img src="./assets/images/vivid-hero.png"></img>
</p>

# Vivid UI components ![develop build](https://github.com/Vonage/vivid/workflows/develop%20build/badge.svg?branch=develop)

Vivid provides a Design System comprised of ready-to-use web components and services, aligned with the Vonage's design guidelines, providing well-thought APIs and striving to stick to the best practices in every possible aspect.

Demos, tutorials and living examples are at [vivid.vonage.com](https://vivid.vonage.com).

Contributor guidance is [here](docs/contributing.md).

---

#### Consumption

Our deliveries are available as GitHub packages, they are privately accessible within Vonage organization.

Please visit [Vivid packages page](https://github.com/Vonage/vivid/packages) to enlist our latest releases. You may further drill into each package to read its specific documentation, review previous versions etc.

GitHub packages may be consumed via various build systems, please refer to [this documentation](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem) for more details.

Obviously, most likely Vivid products will be consumed as **npm** dependencies in **package.json**, specific documentation on that found [here](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package).

---

#### Roadmap

The system contains these aspects:
- general services/facilities (fonts management, scheme management etc)
- atomic/generic components
- high level business-logic specific components

The overall roadmap may be split into the the following:
* alpha (0.0.x versions; alpha-romeo :)) - initial release (month to few months?), deliverables of this release are likely to have breaking changes
	* establishing infra of the CI/CD, deployment space for development and for production
	* establishing a process of feedback-based delivery in a short loops, levereging GitHub issues engine for feedback and discussion
	* actual delivery of a few simple base elements as for an early feedback collection and establishing overall design pattern to be expected by the consuming community
* beta (0.x.x versions; bugatti :)) - wide and verify release (few months?), deliverables of this release are expected to be stable from API perspective
	* applying the feedback collected from the alpha release
	* adding more components to the pool
	* finalizing anything API related
* GA (1.x.x versions; ) - first stable release
	* APIs are finalized and any future breaking changes will require deprecation-removal cycle
	* all of the basic components are implemented
	* some of the high-level components implemented

> As part of our 'go to market' plan, we are focusing first on the essential components, those that are already exist in Volta and used. Quick transition of Volta's components towards Vivid's ones will allow us early-feedback/early-treatment, incremental development and prevent double development and future re-write of the new components.

##### Common

| Component | Package | Status | Issues |
|--|--|--|--|
| `vvd-fonts` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235315) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+font+fonts) |
| `vvd-scheme` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235300) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+scheme+schema+theme) |


##### Generic/Atomic components

| Component | Package | Status | Issues |
|--|--|--|--|
| `<vwc-anchor>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/166581) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+anchor) |
| `<vwc-banner>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+banner) |
| `<vwc-button>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/165931) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+button) |
| `<vwc-callout>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+callout) |
| `<vwc-checkbox>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235311) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+checkbox) |
| `<vwc-chip>` | - | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+chip+chips) |
| `<vwc-drawer>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235307) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+drawer) |
| `<vwc-dropdown>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+dropdown) |
| `<vwc-list>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235303) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+list) |
| `<vwc-menu>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235299) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+menu) |
| `<vwc-formfield>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235309) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+formfield) |
| `<vwc-modal>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+modal) |
| `<vwc-radio>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+radio) |
| `<vwc-scheme-select>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235304) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+scheme+schema+theme+select) |
| `<vwc-select>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235301) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+select) |
| `<vwc-slider>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/251037) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+slider) |
| `<vwc-switch>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235302) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+switch) |
| `<vwc-table>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+table) |
| `<vwc-textfield>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/166369) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+textfield) |
| `<vwc-textarea>` | [![GPR](https://img.shields.io/static/v1?label=GPR&message=0.0.7&color=green&logo=github)](https://github.com/Vonage/vivid/packages/235308) | in progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+textarea) |


##### High level Vonage specific components

| Component | Package | Status | Issues |
|--|--|--|--|
| `<vwc-dialer>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+dialer) |
| `<vwc-video>` | - | planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+video+player+videoplayer) |

---

#### Issues

We use GitHub Issues as the official bug tracker for **Vivid** Please check the [existing issues](https://github.com/vonage/vivid/issues). It's possible someone has already reported the same problem.

If your problem or idea is not addressed yet, [open a new issue](https://github.com/vonage/vivid/issues/new).

---

#### Suggestions

Go through the [board](https://github.com/vonage/vivid/projects/1) to search for existing feedbacks and share yours if not already addressed.
