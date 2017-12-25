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

  const update = (pageCount) => {
    pageCount = pageCount || 100;
    let output = [];
    const getPage = (after, counter) => {
      if (counter < pageCount) {
        return fetch(createUrl(after, KPOPFAP_CONFIG.PER_PAGE))
          .then((data) => data.json())
          .then((json) => {
            if (json.children && json.children.length === 0) {
              return Promise.resolve();
            }
            output.push(json.data.children
              .map((child) => child.data.url)
              .filter((child) => child.includes(KPOPFAP_CONFIG.LOOK_FOR)));
            return getPage(json.data.after, counter + 1);
          });
      }
    };
    return getPage('none', 0)
      .then(() => {
        return _(output)
          .flatten()
          .map((link, index) => {
            return {
              link,
              id: index,
            };
          })
          .uniqBy('link')
          .value();
      })
      .then((insertData) => {
        output = insertData;
        return kpopfapDb.remove({});
      })
      .then(() => kpopfapDb.insert(output))
      .then(() => output.length);
  };

  return {
    random,
    update,
  };
};

module.exports = kpopfap;
