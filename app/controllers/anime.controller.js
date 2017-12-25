const { embed } = require('../../utils');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const query = encodeURI(args.join(' '));
    data.search.malSearch('anime', query)
      .then((animeData) => msg.channel.send(embed.anime(animeData)))
      .catch((err) => msg.reply(err.message));
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
