const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const query = args.join('_');
    msg.reply(`https://en.wikipedia.org/wiki/${query}`);
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
