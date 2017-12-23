const { MongoClient } = require('mongodb');

const init = (connStr) => {
  if (!connStr) {
    return Promise.resolve();
  }
  return MongoClient.connect(connStr);
};

module.exports = { init };
