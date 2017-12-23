const { embed } = require('../../utils');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const query = encodeURI(args.join(' '));
    data.search.anime(query)
      .then((animeData) => {
        msg.channel.send(embed.anime(animeData));
      });
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
