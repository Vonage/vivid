<p align="center">
  <img height="64px" src="./vvd-logo.svg"></img>
</p>

# Vivid UI components

#### Get up and running
* Clone the repo
* Run `yarn install` in order to build the repo once / bring the dependencies
* Run the following steps as the normal build-and-see flow:
	* `yarn build` - builds `css` from `scss`, compiles `ts` into `js`
	* `yarn dev:server` - runs dev server on `localhost` in order to see the demo pages
	* OR `yarn start` - is a shortcut for `build` and `dev:server`, for your convenience
* Navigate to `http://localhost:5424/index.html` (replace the port if needed) and start hacking with the components in the browser
* Welcome! :)

#### Development and TDD/Demo
In order to see/debug your changes during the ongoing work do the following:
* In one terminal run `yarn start` - this will build your repo and start the dev server, so that you can see a demo page at `http://localhost:5452/index.html`
* Do your awesome changes to the code, be careful not break other peoples' stuff :)
* When willing to see the changes, run in another terminal `yarn build` - this will rebuild your repo and the demo page will be auto refreshed
* Rinse and repeat...

#### Testing
There are several tools, that we've set up to ensure the ongoing quality of the product:
* lint - `eslint` performs a static code analysis
* test - `karma` tool is used
* coverage - `istanbul` is here (set up within the `karma` runner)

All those are running in the CI, so if the code is pushed and the CI will run over it, it will fail if not tested locally :)

In order to do a __lint__ verification, execute
`npm run lint:eslint` or `yarn lint:eslint`.

To run the tests do `npm run test:dev` or `yarn test:dev`. Running tests in `dev` mode will open a Chrome browser managed by `karma`, so that you'll be able to see an ongoing tests execution and debug the code directly in the browser. This instance of Chrome will be reloaded each time you save the sources (either the product or the test files).
> When running tests in a `dev` mode, no coverage is collected.

After you being happy with the implementation and test are looks good to you, please run `npm run:test` or `yarn test`, this will rerun tests in headless Chrome and will collect coverage.
Review the report to see that the threshold is not broken.
If it is, you can inspect the UI report of the coverage in the `coverage` folder and see where you can improve.

---

<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:

```sh
npm init @open-wc
# requires node 10 & npm 6 or higher
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Karma
- `lint` runs the linter for your project



## Issues

We use GitHub Issues as the official bug tracker for the **Liva Theme.** Please Search [existing issues](https://github.com/vonage/vivid/issues). It’s possible someone has already reported the same problem.

If your problem or idea is not addressed yet, [open a new issue](https://github.com/vonage/vivid/issues/new)
