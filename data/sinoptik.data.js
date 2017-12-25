const fetch = require('node-fetch');
const { parseHtml, parseUrl } = require('../utils/');
const { SINOPTIK_CONFIG } = require('../app-config');

const sinoptik = (db) => {
  const getForecastForTomorrow = (city) => {
    city = city || 'sofia';
    const url = SINOPTIK_CONFIG.URL[city.toUpperCase()];
    if (!url) {
      return Promise.reject('No such forecast');
    }
    return fetch(url)
      .then((data) => data.text())
      .then((html) => parseHtml(html))
      .then((dom) => dom.toData(SINOPTIK_CONFIG.DATA));
  };

  return {
    getForecastForTomorrow,
  };
};

module.exports = sinoptik;
