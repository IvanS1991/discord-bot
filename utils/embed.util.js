const Discord = require('discord.js');

const anime = (animeData) => {
  const embed = new Discord.RichEmbed()
    .setTitle(animeData.title)
    .setColor(0x00AE86)
    .setURL(animeData.link)
    .setThumbnail(animeData.img)
    .setDescription(animeData.description)
    .addField(`Score:`, animeData.score, true)
    .addField(`Aired:`, animeData.aired, true)
    .setTimestamp();

  return { embed };
};

module.exports = {
  anime,
};
