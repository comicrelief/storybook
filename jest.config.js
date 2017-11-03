module.exports = {
  setupFiles: ['<rootDir>/__tests__/__mocks__/shim.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: ['/__tests__/__mocks__/', '/node_modules/'],
};
