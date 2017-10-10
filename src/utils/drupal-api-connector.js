import { connect } from 'react-refetch';

const cache = new Map();

export default connect.defaults({
  buildRequest(mapping) {
    const options = {
      method: mapping.method,
      cache: 'force-cache',
      redirect: mapping.redirect,
      body: mapping.body,
    };
    return new Request(mapping.url, options);
  },

  fetch(input, init) {
    const req = new Request(input, init);
    const now = new Date().getTime();
    const inAMinute = 60000 + now;
    const cached = cache.get(req.url);

    if (cached && cached.time < inAMinute) {
      return new Promise(resolve => resolve(cached.response.clone()));
    }

    return fetch(req).then((response) => {
      cache.set(req.url, {
        time: now,
        response: response.clone(),
      });

      return response;
    });
  },
});
