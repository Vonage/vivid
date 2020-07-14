# vwc-keypad

A keypad component for Vonage's Vivid Web Components

## Properties

| Property      | Type      |
|---------------|-----------|
| `no-asterisk` | `boolean` |
| `no-hash`     | `boolean` |
| `no-display`  | `boolean` |
| `actionText`  | `string`  |
| `cancelText`  | `string`  |

## Methods

| Method          | Type       |
|-----------------|------------|
| `createAction`  | `(): void` |

## Events

| Event           | Payload         |
|-----------------|-----------------|
| `digit-added`   | `digit: string` |
| `digits-sent`   | `digit: string` |
| `action-ended`  | `null`          |

# \<vwc-keypad>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i vwc-keypad
```

## Usage
```html
<script type="module">
  import 'vwc-keypad/vwc-keypad.js';
</script>

<vwc-keypad></vwc-keypad>
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Demoing with Storybook
To run a local instance of Storybook for your component, run
```bash
npm run storybook
```

To build a production version of Storybook, run
```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
