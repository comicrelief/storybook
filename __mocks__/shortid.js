const shortid = jest.genMockFromModule('shortid');
let predictableId = 0;

const generate = () => {
  predictableId += 1;
  return predictableId;
};

shortid.generate = generate;

module.exports = shortid;
