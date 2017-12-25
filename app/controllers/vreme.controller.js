const { embed } = require('../../utils');

const wrapper = (command, data) => {
  const handler = (msg, args) => {
    const city = args[0];
    data.sinoptik.getForecastForTomorrow(city)
      .then((forecastData) => msg.reply(embed.forecast(forecastData)))
      .catch((err) => console.log(err));
  };

  return {
    command,
    handler,
  };
};

module.exports = wrapper;
