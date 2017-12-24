const init = (db) => {
  return {
    search: require('./search.data')(db),
    kpopfap: require('./kpopfap.data')(db),
  };
};

module.exports = { init };
