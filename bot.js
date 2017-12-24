const Discord = require('discord.js');

const handler = require('./app/handler/');
const { BOT_TOKEN, DB_CONN_STR, DB_NAME } = require('./app-config');

const client = new Discord.Client();

require('./db').init(DB_CONN_STR, DB_NAME)
  .then((db) => require('./data').init(db))
  .then((data) => require('./app').init(data))
  .then(() => {
    client.login(BOT_TOKEN);

    client.on('ready', () => {
      console.log('Kaka filka duha plashta...');
    });

    client.on('message', handler.invoke);
  })
  .catch((err) => {
    console.log(err);
  });
