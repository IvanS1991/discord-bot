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

const aniChar = (aniCharData) => {
  const embed = new Discord.RichEmbed()
    .setTitle(aniCharData.title)
    .setColor(0x00AE86)
    .setURL(aniCharData.link)
    .setImage(aniCharData.img);

  return { embed };
};

const forecast = (forecastData) => {
  const embed = new Discord.RichEmbed()
    .addBlankField()
    .addField('Температура:', forecastData.temp, true)
    .addField('Време:', forecastData.cond, true)
    .addField('Вероятност за дъжд:', forecastData.rainProb, true)
    .addField('Облачност:', forecastData.cloudy, true)
    .addField('Вятър:', forecastData.wind, true)
    .setThumbnail(forecastData.img)
    .setTitle(`${forecastData.city} - ${forecastData.day} - ${forecastData.date}`);

  return { embed };
};

module.exports = {
  anime,
  aniChar,
  forecast,
};
