const init = (db) => {
  return {
    search: require('./search.data')(db),
  };
};

module.exports = { init };
