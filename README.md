# Comic Relief Storybook [![NPM version][npm-image]][npm-url]
> React components to build the Comic Relief front-end experience

### Installation

```shell
npm install @comicrelief/storybook --save
```

### Develop components with storybook

```shell
npm run storybook
```

Open http://localhost:6006/

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

To build storybook components locally within an app, please use `npm link`. [Learn how to do this here](https://github.com/lonelyplanet/backpack-ui/wiki/Developing-components-for-new-apps)

[npm-image]: https://badge.fury.io/js/%40comicrelief%2Fstorybook.svg
[npm-url]: https://www.npmjs.com/package/@comicrelief/storybook