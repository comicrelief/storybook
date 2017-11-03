global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

// React test renderer is not coupled to React DOM
// here we have to mock findDOMNode as a result
// it is used by react-onclickoutside used by react-bootstrap-typeahead
jest.mock('react-dom', () => ({
  findDOMNode: () => ({
    getContext: jest.fn(),
  }),
}),
);
