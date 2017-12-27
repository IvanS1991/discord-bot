const meta = (db) => {
  const getToken = () => {
    return db.collection('meta').find({})
      .toArray()
      .then((metas) => {
        return metas.find((meta) => meta.hasOwnProperty('token'))['token'];
      });
  };

  return {
    getToken,
  };
};

module.exports = meta;
