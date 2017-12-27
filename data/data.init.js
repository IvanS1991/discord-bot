const init = (db) => {
  return {
    meta: require('./meta.data')(db),
    search: require('./search.data')(db),
    kpopfap: require('./kpopfap.data')(db),
    sinoptik: require('./sinoptik.data')(db),
  };
};

module.exports = { init };
