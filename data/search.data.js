const fetch = require('node-fetch');
const { parseHtml } = require('../utils/');
const { SEARCH_CONFIG } = require('../app-config');

const searchData = (db) => {
  const anime = (query) => {
    const url = `${SEARCH_CONFIG.ANIME.BASE_URL}${query}`;
    let animeLink;
    return fetch(url)
      .then((data) => {
        return data.text();
      })
      .then((html) => {
        return parseHtml(html);
      })
      .then((dom) => {
        return dom.toLink(SEARCH_CONFIG.ANIME.LINK);
      })
      .then((link) => {
        animeLink = link;
        return fetch(link);
      })
      .then((data) => {
        return data.text();
      })
      .then((html) => {
        return parseHtml(html);
      })
      .then((dom) => {
        const animeData = dom.toData(SEARCH_CONFIG.ANIME.DATA);
        animeData.link = animeLink;
        return animeData;
      });
  };

  return {
    anime,
  };
};

module.exports = searchData;
