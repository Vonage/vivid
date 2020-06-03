
### Get up and running

* Clone the repo
* Run `yarn` (repo relies on yarn workspaces) in order to build the repo once / bring the dependencies
* Run the following steps as the normal build-and-see flow:
	* `yarn compile` - builds `css` from `scss`, compiles `ts` into `js`
	* `yarn dev:server` - runs dev server on `localhost` in order to see the demo pages
	* OR `yarn start` - is a shortcut for `compile` and `dev:server`, for your convenience
	* AND `yarn watch` - observes & compiles scss / ts files in src folders. Run it in a separate terminal window in order to watch changes occur while editing files.
* Navigate to `https://localhost:5424/index.html` (replace the port if needed) and start hacking with the components in the browser
* Welcome! :)

---


## Scripts

- `yarn` does initial installation of the dependencies (yarn is preferred here for a fast resolution)
- `compile` compiles typescript, scss etc
- `start` runs demo app for development (will auto trigger `compile` command beforehand), reloading on file changes
- `test` runs test suite with Karma
- `lint` runs the linter for your project
- `build` builds demo app for production