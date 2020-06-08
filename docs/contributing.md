# Contributor guideline

Vivid team is dedicated to deliver and support the services and the components for the front end teams across the Vonage.

Yet, we believe that this project should be managed as an open source, within the organization.
Contributions are most welcome.

As with any other platform-like case, responsibility for a stable and quality code for all requires some process to be followed and some reasonable gatekeepers to pass over.

---

#### Process

##### Feature request

When a team needs some service or component which feels like suitable for a broader usage, we advise first to see an existing stuff, [packages](https://github.com/Vonage/vivid/packages) and [demo](vivid.vonage.com) are the best places to refer to.

If the desired thing was not found, please consult with an [issues](https://github.com/Vonage/vivid/issues) and [features](https://github.com/Vonage/vivid/projects), it is possible something is already in the pipe.

If yet nothing similar found, create a new feature request / issue. Of course, everyone is more than welcome to contact Vivid team directly too.

Important! We do ask to follow this process even if the one is going to implement the feature her/himself.

##### Coding time

Have you decided to implement something cool as part of the Vivid project? Great! We'd like to help you with that so that the dev-experience would be excellent.
Below are few intos, but most important - is something doesn't feel right, please talk to us.
We won't promise that everything will be fixed as we are opinionated people as well, but we'll definitely listen carefully and try to solve things.

###### Getting up and running

* clone the repo
	* see note below about the SSH keys
* run `yarn` (repo relies on yarn workspaces) in order to build the repo once / bring the dependencies
* run the following steps as the normal build-and-see flow:
	* `yarn compile` - builds `css` from `scss`, compiles `ts` into `js`
	* `yarn dev:server` - runs dev server on `localhost` in order to see the demo pages
		* OR `yarn start` - this is a shortcut for `compile` and `dev:server`, for your convenience
	* `yarn watch` - watches for changes in scss / ts files in src folders and recompiles whatever is needed (run in another terminal)
* navigate to `http://localhost:5424/index.html` and start hacking with the components in the browser
* Welcome! :)
* just before getting into the change, please make sure to branch out from the `develop` branch, giving your branch some good and descriptive name
* during the coding time, it is best to sync with `develop` rather frequently, we'll do our best to keep it evergreen

###### Coded, looks okay, now quality time

In order to ensure certain level of quality we rely on automation.
But even before you code hits the CI you can run some preliminary checks locally:
* `yarn lint` - runs the linter (ESLint) on your code (I'm always surprised how it finds typos in my best crafted code :))
* `yarn test` - runs test suite (Karma); this one will ensure that you've not broken stuff of anyone else; but it is even better to add you own tests to the new functionality too, trust us, you'll sleep better this way :)

> We do have a coverage collected (Istanbul) but its level is not yet enforced at this point. Full report may be found in a nice UI layout in the coverage folder after the tests ran.

###### All good, let' deliver

When you happy with what you've done, please open a PR back to the `develop` branch.
You may specify reviewer if relevant.

Done! Well, there probably will be some exchange of comments and fixes, but eventually your PR will be merged into the `develop` branch, which will eventually be taken to release branch and finally pushed to production.

---

> Git usage note: in order to be able to push you code into the repo you need to have/setup an SSH keys. [This documentation](https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) makes it a breeze.

---

#### CI/CD and workflow

TBD

---

#### Useful scripts

- `build` builds demo app for production
