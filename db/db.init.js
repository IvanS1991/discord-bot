const { MongoClient } = require('mongodb');

const init = (connStr, dbName) => {
  if (!connStr) {
    return Promise.resolve();
  }
  return MongoClient.connect(connStr)
    .then((mongoClient) => {
      return mongoClient.db(dbName);
    });
};

module.exports = { init };
