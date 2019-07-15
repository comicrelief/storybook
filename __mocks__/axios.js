const axios = jest.genMockFromModule('axios');

const getResponse = response => ({
  ok: true,
  json: () => response,
});

const get = (url) => {
  let response;
  switch (true) {
    case /footer/.test(url): {
      response = getResponse([]);
      break;
    }
    case /grants/.test(url): {
      response = getResponse({
        data: {
          pagination: {
            total: 0,
            page: 0,
            pages: 0,
          },
          grants: [],
          facets: {
            issue: [],
            country_name: [],
          },
        },
      });
      break;
    }
    case /postcodes.*lon.*lan/.test(url): {
      response = getResponse({
        result: [
          {
            postcode: 'SE1 7AB',
          },
        ],
      });
      break;
    }
    case /postcodes/.test(url): {
      response = getResponse({
        result: {
          longitude: 1,
          latitude: 2,
        },
      });
      break;
    }
    default: {
      response = getResponse({});
      break;
    }
  }
  return Promise.resolve(response);
};

axios.get = get;

module.exports = axios;
