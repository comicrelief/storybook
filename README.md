# Comic Relief Storybook [![NPM version][npm-image]][npm-url] [![Build Status](https://travis-ci.org/comicrelief/storybook.svg)](https://travis-ci.org/comicrelief/storybook)
> React components to build the Comic Relief front-end experience

## To run CR Storybook locally

### Installation

* Clone this repository
* `npm install`
* `npm run storybook`
* Visit http://localhost:9009/

### Development

Then import your component(s) into stories/index.js and render them like so:

```js
storiesOf("Some component name", module)
  .add("Default", () => (
    <ComponentName />
  ))
  .add("Some variation", () => (
    <ComponentName prop="value" />
  ));
```

### Unit testing

Our target is to cover:
* interaction with component via user actions mainly
  * We use [Jest](https://facebook.github.io/jest/), as testing framework and [Enzyme](https://github.com/airbnb/enzyme) a testing utility which makes it easy to assert, manipulate, and traverse React Components' output.
For assertions we use [Expect](https://github.com/mjackson/expect).
* component layout at it's lifecycle different states
  * This can be achieved via [Storybook storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) and [Jest snapshots](https://facebook.github.io/jest/docs/en/snapshot-testing.html)

In order to run unit tests

* ```yarn test```
* For update mode : ```yarn test-update``` You may need it to update snapshots after intentional layout changes

## Getting Started as dependencies in your project

To build storybook components locally within an app, please use `npm link`. [Learn how to do this here](https://github.com/lonelyplanet/backpack-ui/wiki/Developing-components-for-new-apps)

Then import your component(s) into components/index.js and rebuild build files via `yarn build`

[npm-image]: https://badge.fury.io/js/%40comicrelief%2Fstorybook.svg
[npm-url]: https://www.npmjs.com/package/@comicrelief/storybook

### Install dependencies
Ensure packages are installed with correct version numbers by running:
  ```
  npm install @comicrelief/storybook --save
  ```

### Include component
```js
import { Footer, FileUp } from '@comicrelief/storybook';
```

### Semantic Release Process

Git commit messages are used to automatically publish a new version of npm package. To achieve this, **every commit message** should have a **type** and a **message** in the format described below.

Travis CI will run a job automatically after PR is merged and analyze all commit messages since last npm release. Then semantic-release plugin will calculate new version according to this result.

To avoid commit loops, version numbers are not committed back to `package.json`. Versions are listed on [GitHub releases](https://github.com/comicrelief/storybook/releases) and used in the modified package.json [published to npm](https://www.npmjs.com/package/@comicrelief/storybook).

Commit messages are expected to be in this format:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
Minimally, only `type` and `subject` is required.

#### Bugfix / patch
When there are no breaking changes or no new features. When we are fixing bugs or styles.
```
fix: A bug fix
```

#### Minor / Feature
When there is a new feature / functionality is added to the library
```
feat: A new feature
```

#### Major / breaking change
When there is a breaking change, we need to extend our commit message and add `BREAKING CHANGE: A 
description of the change` to its body. This message can be added to any type of commit. 
Example:
```
feat: A new feature

BREAKING CHANGE: A description of the change
```

### Automating commit message format
Commitizen library is added as npm dev dependency and it can be used to generate commit messages by 
answering a few questions and skipping the ones which are not relavent.
Example workflow:
- Make code changes in your feature branch
- Run **`git add .`** to add changed files and get ready to commit
- Run **`yarn commit`**
 
This will start an interactive process to build commit message. Simply answer all questions or
press `Enter` to skip.
 
 - Repeat and follow rest of the GitHub workflow
