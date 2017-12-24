const fetch = require('node-fetch');
const _ = require('lodash');

const { randInt } = require('../utils/');
const { KPOPFAP_CONFIG } = require('../app-config');

const kpopfap = (db) => {
  const kpopfapDb = db.collection(KPOPFAP_CONFIG.DB_COLLECTION);
  const createUrl = (after, count) => {
    let url = KPOPFAP_CONFIG.BASE_URL;
    if (after !== 'none') {
      url = `${KPOPFAP_CONFIG.BASE_URL}?count=${count}&after=${after}`;
    }
    return encodeURI(url);
  };

  const random = () => {
    return kpopfapDb.find({})
      .count()
      .then((count) => {
        const id = randInt(0, count - 1);
        return kpopfapDb.findOne({ id });
      });
  };

  const update = () => {
    let output;
    const promises = [];
    let after = 'none';
    for (let i = 0; i < KPOPFAP_CONFIG.PAGE_COUNT; i += 1) {
      promises.push(fetch(createUrl(after, KPOPFAP_CONFIG.PER_PAGE))
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          after = json.after;
          return json.data.children
            .map((child) => child.data.url)
            .filter((child) => child.includes(KPOPFAP_CONFIG.LOOK_FOR));
        }));
    }
    return Promise.all(promises)
      .then((values) => {
        output = _(values)
          .flatten()
          .map((link, index) => {
            return {
              link,
              id: index,
            };
          })
          .value();
        return kpopfapDb.remove({});
      })
      .then(() => {
        return kpopfapDb.insert(output);
      })
      .then(() => {
        return output.length;
      });
  };

  return {
    random,
    update,
  };
};

module.exports = kpopfap;
