const { embed } = require('../../utils');
const { APP_ADMIN, KPOPFAP_CONFIG } = require('../../app-config');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const param = args[0];
    if (param === KPOPFAP_CONFIG.PARAMS.RANDOM) {
      data.kpopfap.random()
        .then((match) => {
          msg.reply(match.link);
        });
    } else if (param === KPOPFAP_CONFIG.PARAMS.UPDATE) {
      if (msg.author.username !== APP_ADMIN) {
        return msg.reply('You can\'t do that!');
      }
      data.kpopfap.update()
        .then((updatedCount) => {
          msg.reply(`Updated ${updatedCount} items in KPOPFAP DB`);
        });
    }
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
