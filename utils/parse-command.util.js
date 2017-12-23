const { COMMAND } = require('../app-config');

const parseCommand = (string) => {
  const commandPieces = string.split(COMMAND.SEPARATOR);
  const keyword = commandPieces[0];
  if (commandPieces.length !== 2 || keyword !== COMMAND.KEYWORD) {
    return null;
  }

  const args = commandPieces[1].trim().split(' ');
  const command = args[0];

  return {
    command,
    args: args.splice(1),
  };
};

module.exports = parseCommand;
