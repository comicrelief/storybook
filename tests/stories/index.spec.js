import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';
import { mockRandomForEach } from 'jest-mock-random';

describe('SchoolsLookup', () => {
  // Math.random() is used to generate a prop value
  // Here we mock Math.random(), to make sure return is the same everytime we run the test
  // That way, existing snapshots wil always match render result
  mockRandomForEach([0.1]);

  // Snapshots set all refs to null
  // So any ref needs to be mocked manually
  const createNodeMock = (el) => {
    switch (el.type) {
      case 'input':
      case 'div':
        return document.createElement(el.type);

      default:
        return null;
    }
  };

  // test SchoolsLookUp layout at it's lifecycle different states
  initStoryshots({
    storyKindRegex: /^SchoolsLookUp$/,
    test: snapshotWithOptions({ createNodeMock }),
  });
});
