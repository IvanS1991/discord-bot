const { APP_ADMIN, KPOPFAP_CONFIG } = require('../../app-config');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const param = args[0];
    const count = parseInt(args[1], 10);
    if (param === KPOPFAP_CONFIG.PARAMS.RANDOM || !param) {
      data.kpopfap.random()
        .then((match) => msg.reply(match.link))
        .catch((err) => msg.reply(err.message));
    } else if (param === KPOPFAP_CONFIG.PARAMS.UPDATE) {
      if (msg.author.username !== APP_ADMIN) {
        return msg.reply('You can\'t do that!');
      }
      msg.channel.send('Updating KPOPFAP DB...');
      data.kpopfap.update(count)
        .then((updatedCount) => msg.reply(`Updated ${updatedCount} items in KPOPFAP DB`))
        .catch((err) => msg.reply(err.message));
    }
    return null;
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
