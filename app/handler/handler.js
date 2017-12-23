const { parseCommand } = require('../../utils/');
const { BOT_NAME } = require('../../app-config');

const handler = (() => {
  const registry = {};
  let currentMsg;

  const subscribe = (command, callback) => {
    if (registry[command]) {
      throw new Error(`${command} is already registered`);
    }
    registry[command] = callback;
  };

  const dispatch = (command, args) => {
    if (registry[command]) {
      registry[command](currentMsg, args);
    }
  };

  const invoke = (msg) => {
    const commandObj = parseCommand(msg.content);
    currentMsg = msg;
    if (!commandObj || currentMsg.author.username === BOT_NAME) {
      return null;
    }
    if (!registry[commandObj.command]) {
      return currentMsg.reply('Not a valid command');
    }
    return dispatch(commandObj.command, commandObj.args);
  };

  return {
    subscribe,
    invoke,
  };
})();

module.exports = handler;
