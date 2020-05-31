<p align="center">
  <img src="./assets/images/vivid-hero.png"></img>
</p>

# Vivid UI components ![develop build](https://github.com/Vonage/vivid/workflows/develop%20build/badge.svg?branch=develop)
[vivid.vonage.com for demos](https://vivid.vonage.com) 

### Roadmap

##### Common

| Component | Package | Status | Issues |
|--|--|--|--|
| `vvd-fonts` | [![GPR](https://img.shields.io/static/v1?label=vvd-fonts&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/235315) | Ready | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+font+fonts) |
| `vvd-scheme` | [![GPR](https://img.shields.io/static/v1?label=vvd-scheme&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/235300) | Ready | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+scheme+schema+theme) |
| `vwc-scheme-select` | [![GPR](https://img.shields.io/static/v1?label=vvd-scheme-select&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/235304) | Ready | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+scheme+schema+theme+select) |


##### Generic/Atomic components

| Component | Package | Status | Issues |
|--|--|--|--|
| `<vwc-button>` | [![GPR](https://img.shields.io/static/v1?label=vwc-button&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/165931) | Ready | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+button) |
| `<vwc-chip>` | - | In progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+chip+chips) |
| `<vwc-formfield>` | [![GPR](https://img.shields.io/static/v1?label=vwc-formfield&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/235309) | Ready | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+formfield) |
| `<vwc-checkbox>` | [![GPR](https://img.shields.io/static/v1?label=vwc-checkbox&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/235311) | Ready | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+checkbox) |
| `<vwc-radio>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+radio) |
| `<vwc-select>` | [![GPR](https://img.shields.io/static/v1?label=vwc-select&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/235301) | Ready | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+select) |
| `<vwc-textfield>` | [![GPR](https://img.shields.io/static/v1?label=vwc-textfield&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/166369) | In progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+textfield) |
| `<vwc-textarea>` | [![GPR](https://img.shields.io/static/v1?label=vwc-textarea&message=0.0.7&color=green&logo=github)](https://github.com/github/Vonage/vivid/packages/235308) | In progress | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+textarea) |
| `<vwc-dropdown>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+dropdown) |
| `<vwc-callout>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+callout) |
| `<vwc-banner>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+banner) |
| `<vwc-modal>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+modal) |
| `<vwc-table>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+table) |


##### High level Vonage specific components

| Component | Package | Status | Issues |
|--|--|--|--|
| `<vwc-dialer>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+dialer) |
| `<vwc-video>` | - | Planned | [*Issues*](https://github.com/Vonage/vivid/issues?q=is%3Aissue+is%3Aopen+video+player+videoplayer) |


### Get up and running
* Clone the repo
* Run `yarn` (repo relies on yarn workspaces) in order to build the repo once / bring the dependencies
* Run the following steps as the normal build-and-see flow:
	* `yarn build` - builds `css` from `scss`, compiles `ts` into `js`
	* `yarn dev:server` - runs dev server on `localhost` in order to see the demo pages
	* OR `yarn start` - is a shortcut for `build` and `dev:server`, for your convenience
	* AND `yarn watch` - observes & compiles scss / ts files in src folders. Run it in a separate terminal window in order to watch changes occur while editing files.
* Navigate to `https://localhost:5424/demos/index.html` (replace the port if needed) and start hacking with the components in the browser
* Welcome! :)

---


## Scripts

- `compile` builds your app for development
- `start` runs your app for development after it has been built using the build command, reloading on file changes
- `test` runs your test suite with Karma
- `lint` runs the linter for your project



## Issues

We use GitHub Issues as the official bug tracker for **Vivid** Please Search [existing issues](https://github.com/vonage/vivid/issues), probably someone has already reported the same problem.

If your problem or idea is not addressed yet, [open a new issue](https://github.com/vonage/vivid/issues/new).

## Suggestions

Go through the [board](https://github.com/vonage/vivid/projects/1) to search for an existing feedbacks and share yours if not already addressed.
