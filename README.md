
<p align="center">
  <img src="./assets/images/vivid-hero.png"></img>
</p>

# Vivid UI components ![develop build](https://github.com/Vonage/vivid/workflows/develop%20build/badge.svg?branch=develop)
[vivid.vonage.com for demos](https://vivid.vonage.com) 

### Roadmap
| Package | Status | Issues |
|--|--|--|
| [`<vwc-button>`](https://github.com/Vonage/vivid/packages/165931) | [![GitHub Package Registry version](https://img.shields.io/github/release/github/learning-lab-components.svg?label=GPR&logo=github)](https://github.com/github/Vonage/vivid/packages/165931) |
|--|--|

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

- `start` runs your app for development after it has been built using the build command, reloading on file changes
- `build` builds your app
- `test` runs your test suite with Karma
- `lint` runs the linter for your project



## Issues

We use GitHub Issues as the official bug tracker for **Vivid** Please Search [existing issues](https://github.com/vonage/vivid/issues). It’s possible someone has already reported the same problem.

If your problem or idea is not addressed yet, [open a new issue](https://github.com/vonage/vivid/issues/new)

## Suggestions

Go through the [board](https://github.com/vonage/vivid/projects/1) to search for existing feedbacks and share yours if not already addressed.
