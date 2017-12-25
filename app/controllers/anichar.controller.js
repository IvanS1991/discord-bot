const { embed } = require('../../utils');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const query = encodeURI(args.join(' '));
    data.search.malSearch('character', query)
      .then((aniCharData) => msg.channel.send(embed.aniChar(aniCharData)))
      .catch((err) => msg.reply(err.message));
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
