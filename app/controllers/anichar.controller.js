const { embed } = require('../../utils');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const query = encodeURI(args.join(' '));
    data.search.malSearch('character', query)
      .then((aniCharData) => msg.channel.send(embed.aniChar(aniCharData)))
      .catch((err) => console.log(err));
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
