const fetch = require('node-fetch');
const { parseHtml, parseUrl } = require('../utils/');
const { SEARCH_CONFIG } = require('../app-config');

const searchData = (db) => {
  const malSearch = (type, query) => {
    const types = ['anime', 'manga', 'character'];
    if (types.indexOf(type) === -1) {
      throw new Error('wrong type');
    }
    const config = SEARCH_CONFIG.MAL[type.toUpperCase()];
    const baseUrl = SEARCH_CONFIG.MAL.BASE_URL;
    const url = `${baseUrl}/${type}.php?q=${query}`;
    let animeLink;
    return fetch(url)
      .then((data) => data.text())
      .then((html) => parseHtml(html))
      .then((dom) => dom.toLink(config.LINK))
      .then((link) => {
        animeLink = parseUrl(link, baseUrl);
        return fetch(animeLink);
      })
      .then((data) => data.text())
      .then((html) => parseHtml(html))
      .then((dom) => {
        const animeData = dom.toData(config.DATA);
        animeData.link = animeLink;
        return animeData;
      });
  };

  return {
    malSearch,
  };
};

module.exports = searchData;
