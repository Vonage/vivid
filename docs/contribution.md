# Contribution

### We'd love you to contribute!

###### We always appreciate code contributions and collaborations as our mission is to make it easy and useful for you.

![Contribution](assets/images/contribution.svg)

[Back to main page](../readme.md)

We believe, that this project should be managed as an internal open source, so any contributions are most welcome.

As with any other platform-like case, responsibility for a stable and quality code for all, requires some process to be followed and some reasonable gatekeepers to pass through.

---

### Feature request

When a team needs new service or component, we suggest first to see if anything similar is already available. [Packages](https://github.com/Vonage/vivid/packages) and [demo site](https://vivid.vonage.com/) are the best places to start with.

If nothing suitable found, please search the [issues](https://github.com/Vonage/vivid/issues) and [features](https://github.com/Vonage/vivid/projects), it is possible something is already in the pipe.

If yet nothing found, create a new feature request / issue. Of course, everyone is more than welcome to contact Vivid team directly too.

Once the action items lands on our table, we'll contact you, do an initial triage of the requirements and the functional spec and some high level architectural design review.

> Important! We do ask to follow this process even if the one who is going to implement the feature is the reporter.

---

### Coding time

Have you decided to implement something cool as part of the Vivid project? Great! 

Below you will find the steps to get you started with a local development environment.
We'd like to help you, so that your dev-experience would be excellent. If something doesn't feel right, please talk to us.
We can't promise that everything will be fixed as we are opinionated people as well, but we'll definitely listen carefully and try to make things right.

#### Getting up and running

* Ask to be added to the Vonage github organization (if you are already there, skip this part) from `githubowners@vonage.com` or fill [this form](https://jira.vonage.com/servicedesk/customer/portal/16/create/96).
* Ask access to the `vivid` repo from a `onestack` member
* Authentication - you can choose one of the following:
    * Generate a token in github [Click here to see how](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
* clone the repository
	* `git clone https://github.com/Vonage/vivid.git`
    * When asked for username enter the token you have created
    * When asked for password, leave blank
    * If you are not asked for credentials, [read this](https://docs.github.com/en/github/using-git/updating-credentials-from-the-osx-keychain)
    * Set the project's token so you would not need to add it manually every time:
        * [Read this](https://docs.github.com/en/github/using-git/updating-credentials-from-the-osx-keychain)
* run `yarn` in order to build the repo once / bring the dependencies
* run the following steps as the normal build-and-see flow:
	* `yarn compile` - builds `css` from `scss`, compiles `ts` into `js` and performs other specific machinery
	* `yarn start` - builds and runs a Storybook locally in order to see the demo pages
	* `yarn watch` - watches for changes in scss / ts files in src folders and re-compiles changes (runs in another terminal)
* navigate to `http://localhost:9000` and start hacking with the components in the browser
* Welcome! :)
* just before getting into the change, please make sure to branch out from the main branch, giving your branch some good and descriptive name
* during the coding time, it is best to sync with the main branch rather frequently, we'll do our best to keep it evergreen
* Be sure to [familiarize yourself with our design tokens](./vivid-design-tokens.md).

#### Coded, looks okay, now quality time

In order to ensure certain level of quality we rely on automation. Our CI will run the checks on each of your pushes to remote, reflecting the current feature quality status.
But even before you code hits the CI you can run some preliminary checks locally:
- `yarn lint` - runs the linter (ESLint) on your code (I'm always surprised how it finds typos in my best crafted code :))
- `yarn test:chrome` - runs test suite (Karma); this one will ensure that you've not broken stuff of anyone else; but it is even better to add you own tests to the new functionality too, trust us, you'll sleep better this way :)

> We do have a coverage collected (Istanbul) but its level is not yet enforced at this point. Full report may be found in a nice UI layout in the coverage folder after the tests ran.

> See [here](./dev-ops-process.md) more details about the full 'fork-push-pull-request-merge-release' flow.

#### All good, let's deliver

When you happy with what you've done, push your branch to and open a PR back to our main branch.
Please provide a short and informative message of what has been done and for what need.
We are welcoming any labels if appropriate.
You may also pick some reviewer for our core team.

--- 

### CI/CD and workflow

Automation is a heart of any vibrant and quickly evolving project, especially when it's a community oriented one. [Here](./dev-ops-process.md) you can see a more technical and detailed description of the full 'requirement-to-production' flow from an automation perspective.

---

### Useful CLI commands

* `yarn compile` - builds a whole project
* `yarn start` - builds and runs a local Storybook
* `yarn lint` - will run a static code analysis and notify if any issues found
* `yarn test:dev` - builds and runs tests in a watch mode (headful Chromium)
* `yarn test:chrome` / `yarn test:firefox` / `yarn test:safari` - runs tests on the specified platform
	* Safari will be running in headful mode, the rest will run headless
	* no build performed for these, if need - please run `yarn compile` beforehand

---

### Useful links

It might also be helpful to read the following docs as well:
* [Architectural approach](./architecture.md) should give you an intro into the main design principles and decisions implemented in Vivid
* [Dev/Ops process](./dev-ops-process.md) should give you a more technical and detailed overview of all automated and manual steps in the 'contributing new feature cycle', which apply equally to contributors within Vivid as well as to guests
