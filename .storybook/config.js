import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import 'babel-polyfill';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src/components/', true, /_story\.jsx?$/));
}

const CenterDecorator = storyFn => <div data-test-id="container">{storyFn()}</div>;
addDecorator(CenterDecorator);
configure(loadStories, module);

