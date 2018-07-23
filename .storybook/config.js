import { configure } from '@storybook/react';
import 'babel-polyfill';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src/components/', true, /_story\.jsx?$/));
}

configure(loadStories, module);

