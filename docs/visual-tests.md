# Vivid Visual UI Tests

Vivid components are going through a visual sanity test on every PR. The process works as follows:
* A test page is built using webpack with the tested Vivid components
* Using playwright the result is `pixelmatch`ed to a baseline image.

## Usage

### Generating a new snapshot

When using the `ui-tests` command, if there's no available snapshot or the `-u` flag is used, we will get a new snapshot like so:
![
![snapshot](https://user-images.githubusercontent.com/6459899/118669004-0ba6f780-b7fe-11eb-977c-e9031d3f1044.png)

### Running the tests against a snapshot

If a snapshot exists and the `-u` flag was not used, the script will compare the images.

On success, a success message will appear:
![image](https://user-images.githubusercontent.com/6459899/118669448-6a6c7100-b7fe-11eb-8039-c1ebcbbabeec.png)

On failure, a failure message will appear:
![image](https://user-images.githubusercontent.com/6459899/118669832-bfa88280-b7fe-11eb-9508-16c2f69b5907.png)

In addition, two images will be created:
1. diff.png - a diff that will be grayed out as there are no differences
2. tmpScreenshot.png - a screenshot that will be similar to the original snapshot.

The diff image will be something like that:
![diff](https://user-images.githubusercontent.com/6459899/118669892-cb944480-b7fe-11eb-95a5-34a0bb62dec7.png)
Notice the red areas which mark the different areas.

``` 
Note to selves - if the height of an element is the problem, it will seem like all the others below are also in error. It is crucial to handle the shown errors top-to-bottom to verify we're not in a goose chase.
```

The `tmpScreenshot` will show the actual screenshot with the diff unmarked.
![tmpScreenshot](https://user-images.githubusercontent.com/6459899/118670282-2463dd00-b7ff-11eb-8768-55ec46b3a894.png)

In the case above, I've changed the textfield's size block to 30px instead of 40px.

## Creating more tests

In order to add more tests, you should create a folder in `/ui-tests/tests` with the name of the component (e.g. `vwc-textfield`). Inside create an `index.js` file.

This file should expose a function called `createElementVariations`. It expects a wrapper element to which it should add its own test case. Here's an example used for the `vwc-audio` component:

```javascript
import vvdCore from '@vonage/vvd-core';
import { VWCAudio } from '@vonage/vwc-audio';

VWCAudio;

export async function createElementVariations(wrapper) {
	const audioElementWrapper = document.createElement('div');
	audioElementWrapper.innerHTML =
		`
<vwc-audio></vwc-audio>
<vwc-audio noseek="true"></vwc-audio>`;
	wrapper.appendChild(audioElementWrapper);

	await vvdCore.settled;
}

```

### Importing from StoryBook

You can also import whole stories from StoryBook. A utility function `storiesToElement` helps to achieve that. Here's an example for a test that gets its data from story book, appends it to the page and also manipulates the DOM a bit (makes sure all the elements are blurred):

```javascript
import vvdCore from '@vonage/vvd-core';
import { VWCTextField } from '@vonage/vwc-textfield';
import * as stories from '@vonage/vwc-textfield/stories/textfield-all.stories';
import { storiesToElement } from '../../utils/storiesToElement';

VWCTextField;

export async function createElementVariations(wrapper) {
	const textElementWrapper = storiesToElement(stories);

	wrapper.appendChild(textElementWrapper);

	await new Promise(res => setTimeout(() => {
		[...textElementWrapper.querySelectorAll('vwc-textfield')].forEach((child) => {
			child.reportValidity();
			child.firstElementChild.blur();
		});
		res();
	}, 0));

	await vvdCore.settled;
}

```
Notice that the script imports all the stories from `text` and then uses `storiesToElement` to create a new element with the stories inside. It then appends the element to the wrapper and blurs all the components inside.

### Running Specific Tests

You can run specific tests by stating them in the command line:
```shell
yarn ui-tests vwc-button vwc-data-grid
```
The command above will run `vwc-button` and `vwc-data-grid` tests only.
### Excluding Tests

You can exclude certain tests from running in the Visual Sanity test by adding them to the `excludedTests.json` array.

### Take Whole Screen Snapshots

The systems takes snapshots of only the components' wrappers. Sometimes, you's like to take a full page screenshot. For instance, in the case of a dialog or snackbar.
For this case, you should use the `snapshotTheWholePage` function:
```javascript
import { snapshotTheWholePage } from '../../utils/testPageUtils';

export async function createElementVariations(wrapper) {
	snapshotTheWholePage(wrapper);
}
```

### Run the Test Pages

Sometimes you'd like to see the test pages in the browser. For this, run the tests with the flag `-s`.  Then browse to `http://localhost:3001` and select the component to watch.
You could also browse directly to the component's page you want: `http://localhost:3001/vwc-badge.html`.

### Updating snapshots
There comes a time when you would like to update the snapshot. Just run the command with `-u` to do so.
Example: `yarn ui-tests -u vwc-button vwc-icon-button` will update the snapshots for button and icon-button.
