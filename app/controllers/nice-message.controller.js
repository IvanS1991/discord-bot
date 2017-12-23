const Discord = require('discord.js');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const embed = new Discord.RichEmbed()
    .setTitle('asd')
    .setAuthor('asd')
    .setColor(0x00AE86)
    .setThumbnail('https://images-ext-1.discordapp.net/external/7jbyPsM7qbFCCZrGYE36SJsmEx91rxrOE8vojlubrtg/https/myanimelist.cdn-dena.com/images/anime/10/2025.jpg?width=58&height=81')
    .setImage('https://images-ext-1.discordapp.net/external/7jbyPsM7qbFCCZrGYE36SJsmEx91rxrOE8vojlubrtg/https/myanimelist.cdn-dena.com/images/anime/10/2025.jpg?width=58&height=81');
    msg.channel.send({ embed });
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
